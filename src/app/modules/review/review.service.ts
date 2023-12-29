import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Course } from '../course/course.model';
import { IReview } from './review.interface';
import { Review } from './review.model';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';

// create review
const createReview = async (payload: IReview, userData: JwtPayload): Promise<IReview | null> => {
  if (!(await User.isUserExists(userData._id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (!(await Course.isCourseExists(payload.courseId))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course does not exist');
  }
  const review = (await Review.create({ ...payload, createdBy: userData._id })).populate(
    'createdBy',
  );
  return review;
};

// get reviews

const getReviews = async (): Promise<IReview[] | null> => {
  const reviews = await Review.find();
  return reviews;
};

export const ReviewServices = {
  createReview,
  getReviews,
};
