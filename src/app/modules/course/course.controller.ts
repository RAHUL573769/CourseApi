import mongoose, { Types } from 'mongoose';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

// create course controller
const createCourse = catchAsync(async (req, res) => {
  // course paylod from request body
  const payload = await req.body;
  const userData = req.user;

  //call course service
  const course = await CourseServices.createCourse(payload, userData);

  //sending response
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created successfully',
    data: course,
  });
});
// get courses controller
const getCourses = catchAsync(async (req, res) => {
  //call course service
  const courses = await CourseServices.getCourses(req.query);

  //sending response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    data: courses,
  });
});

// update course controller
const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const userData = req.user;

  // Convert courseId to ObjectId
  const courseIdObject = new mongoose.Types.ObjectId(courseId);
  const payload = await req.body;
  //call course service
  const course = await CourseServices.updateCourse(courseIdObject, payload, userData);
  //sending response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course updated successfully',
    data: course,
  });
});

// Get Course by ID with Reviews controller

const getCourseReviews = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  //call course service
  const course = await CourseServices.getCourseReviews(courseId as unknown as Types.ObjectId);
  //sending response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course and Reviews retrieved successfully',
    data: course,
  });
});

//Get the Best Course Based on Average Review (Rating) controller
const getBestCourse = catchAsync(async (req, res) => {
  //call course service
  const courses = await CourseServices.getBestCourse();
  //sending response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: courses,
  });
});
export const CourseControllers = {
  createCourse,
  // getCourse,
  getCourses,
  updateCourse,
  getCourseReviews,
  getBestCourse,
};
