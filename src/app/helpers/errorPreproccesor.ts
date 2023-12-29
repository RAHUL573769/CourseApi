import mongoose from 'mongoose';
import { TErrorResponse } from '../interface/error';
import { validationError } from '../errors/validationError';
import { ZodError } from 'zod';
import { zodError } from '../errors/zodError';
import { duplicateError } from '../errors/duplicateError';
import { castError } from '../errors/castError';
import { genericError } from '../errors/genericError';
import AppError from '../errors/AppError';
import { jwtError } from '../errors/jwtError';
import { JsonWebTokenError } from 'jsonwebtoken';

export const errorPreproccesor = (error: any): TErrorResponse => {
  if (error instanceof mongoose.Error.ValidationError) {
    return validationError(error);
  } else if (error instanceof ZodError) {
    return zodError(error);
  } else if (error.code && error.code === 11000) {
    return duplicateError(error);
  } else if (error instanceof mongoose.Error.CastError) {
    return castError(error);
  } else if (error instanceof JsonWebTokenError) {
    return jwtError(error);
  } else if (error instanceof AppError) {
    return genericError(error);
  } else {
    return {
      success: false,
      message: 'Unknown Error',
      errorMessage: error.message,
      errorDetails: {
        issues: [],
        name: 'Error',
      },
    };
  }
};
