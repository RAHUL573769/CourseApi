import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import { JwtPayload } from 'jsonwebtoken';

// create category
const createCategory = async (
  payload: TCategory,
  userData: JwtPayload,
): Promise<TCategory | null> => {
  const { _id } = userData;
  if (!(await User.isUserExists(_id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const result = await Category.create({ ...payload, createdBy: _id });
  return result;
};

//get all categories
const getCategories = async (): Promise<TCategory[] | null> => {
  const result = await Category.find().populate('createdBy');
  return result;
};

export const CategoryServices = {
  createCategory,
  getCategories,
};
