/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { NODE_ENV } from '../config';
import { TErrorResponse } from '../interface/error';
import httpStatus from 'http-status';
import { errorPreproccesor } from '../helpers/errorPreproccesor';

export const golablErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // falback
  let errorResponse: TErrorResponse = {
    success: false,
    message: 'Error occurred',
    errorMessage: error.message || 'Something went wrong',
    errorDetails: {
      issues: [
        {
          path: '',
          message: error.message || 'Something went wrong',
        },
      ],
    },
  };

  // checking what type of error happened
  errorResponse = errorPreproccesor(error);

  if (errorResponse.message === 'Unauthorized Access') {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: errorResponse.message,
      errorMessage: errorResponse.errorMessage,
      errorDetails: errorResponse.errorDetails,
      // error: {},
      stack: null, // Set stack to null for unauthorized access
    });
  }

  // Default error response for other errors
  return res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: errorResponse.message,
    errorMessage: errorResponse.errorMessage,
    errorDetails: errorResponse.errorDetails,
    error: {},
    stack: NODE_ENV === 'production' ? null : error?.stack || null, // Show stack only in development
  });
};
