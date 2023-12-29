import { RequestHandler } from 'express';
import { CategoryServices } from './category.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

//create category contrller
const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await req.body;
    const userData = req.user;
    //call category service
    const data = await CategoryServices.createCategory(category, userData);
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

//get all categories controller
const getCategories = catchAsync(async (req, res) => {
  //call category service to get all categories
  const data = await CategoryServices.getCategories();

  //sending response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Categories retrieved successfully',
    data,
  });
});

export const CategoryController = {
  createCategory,
  getCategories,
};
