import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewServices } from './review.service';

// create review controller
const createReview = catchAsync(async (req, res) => {
  const payload = await req.body;
  const userData = req.user;
  //call review service
  const review = await ReviewServices.createReview(payload, userData);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Review created successfully',
    data: review,
  });
});

// get reviews controller

const getReviews = catchAsync(async (req, res) => {
  //call review service
  const reviews = await ReviewServices.getReviews();

  //send response
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Reviews fetched successfully',
    data: reviews,
  });
});

export const ReviewControllers = {
  createReview,
  getReviews,
};
