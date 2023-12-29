import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IBestCourse, ICourse, ICourseWithReviews } from './course.interface';
import { Course } from './course.model';
import { Review } from '../review/review.model';
import { durationInWeeksCalulation } from '../../utils/durationInWeeksCalulation';
// import { courseSearchableFields } from './course.constant';
import { TQueryObj } from '../../interface/TMeta';

import { getQuery } from '../../helpers/getQuery';
import { Category } from '../category/category.model';
import { User } from '../user/user.model';
import mongoose, { Types } from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

//create course
const createCourse = async (payload: ICourse, userData: JwtPayload): Promise<ICourse | null> => {
  if (!(await User.isUserExists(userData._id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (!(await Category.isCategoryExists(payload.categoryId))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category does not exist');
  }
  if (payload.durationInWeeks) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'durationInWeeks can be calculated using startDate and endDate remove durationInWeeks from your data',
    );
  }

  const weeks = durationInWeeksCalulation(payload.startDate, payload.endDate);
  // adding duration weeks to payload
  payload.durationInWeeks = weeks;
  const course = await Course.create({ ...payload, createdBy: userData._id });

  return course;
};
// get courses

const getCourses = async (query: TQueryObj) => {
  const result = await getQuery(Course.find().populate('createdBy'), query);
  return result;
};

const updateCourse = async (
  courseId: Types.ObjectId,
  payload: ICourse,
  userData: JwtPayload,
): Promise<ICourse | null> => {
  const courseObject = await Course.findById(courseId);
  if (!courseObject) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course not found');
  }
  const areEqual = new mongoose.Types.ObjectId(userData._id).equals(courseObject.createdBy);
  if (!areEqual) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This course: ${courseObject.title}  not belong to this user: ${userData._id}`,
    );
  }
  const { tags, details, ...remainingCourseData } = payload || {};
  const { durationInWeeks, startDate, endDate } = remainingCourseData || {};
  if (durationInWeeks) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'durationInWeeks can be calculated using startDate and endDate remove durationInWeeks from your data',
    );
  }
  if (startDate && endDate) {
    const weeks = durationInWeeksCalulation(startDate, endDate);

    // adding duration weeks to payload
    remainingCourseData.durationInWeeks = weeks;
  }
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (tags && tags.length > 0) {
    const deleteTagsFromRequest = tags.filter((tag) => tag.name && tag.isDeleted);
    const existingTagNames = courseObject.tags.map((tag) => tag.name);
    const nonExistingTags = deleteTagsFromRequest.filter(
      (tag) => !existingTagNames.includes(tag.name),
    );
    if (nonExistingTags.length > 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Tags not found: ${nonExistingTags.map((tag) => tag.name).join(', ')}`,
      );
    }

    const deletedTags = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { tags: { name: { $in: deleteTagsFromRequest.map((tag) => tag.name) } } },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedTags) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course tags!');
    }
  }

  if (tags && tags.length > 0) {
    const newTagsFromRequest = tags.filter((tag) => tag.name && !tag.isDeleted);
    const filteredNewTags = newTagsFromRequest.filter(
      (newTag) => !courseObject.tags.some((existingTag) => existingTag.name === newTag.name),
    );
    const updateTags = await Course.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { tags: filteredNewTags },
      },
      { new: true, runValidators: true },
    );
    if (!updateTags) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course tags!');
    }
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }

  const course = await Course.findByIdAndUpdate(courseId, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  }).populate('createdBy');
  return course;
};

// Get Course by ID with Reviews
const getCourseReviews = async (courseId: Types.ObjectId): Promise<ICourseWithReviews | null> => {
  if (!(await Course.isCourseExists(courseId))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course does not exist');
  }
  const course = await Course.findById(courseId).populate('createdBy');
  if (!course) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course not found');
  }
  const reviews = await Review.find({ courseId }).populate('createdBy');

  return { course, reviews };
};
//Get the Best Course Based on Average Review (Rating)
const getBestCourse = async (): Promise<IBestCourse | null> => {
  const coursee = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: { $round: ['$rating', 2] } },
        reviewCount: { $sum: 1 },
      },
    },
    { $sort: { averageRating: -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: 1,
        averageRating: { $round: ['$averageRating', 2] },
        reviewCount: 1,
      },
    },
  ]);

  const bestCourseId = coursee[0]?._id;
  const bestCourse = await Course.findById(bestCourseId).populate('createdBy');

  return {
    course: bestCourse,
    averageRating: coursee[0]?.averageRating,
    reviewCount: coursee[0]?.reviewCount,
  };
};
export const CourseServices = {
  createCourse,
  // getCourse,
  getCourses,
  updateCourse,
  getCourseReviews,
  getBestCourse,
};
