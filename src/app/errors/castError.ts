import mongoose from 'mongoose';
import { TErrorResponse } from '../interface/error';

export const castError = (error: mongoose.Error.CastError): TErrorResponse => {
  const errorDetails: Record<string, any> = error;

  return {
    success: false,
    message: 'Invalid ID',
    errorMessage: `${error.value} is not a valid ID!`,
    errorDetails,
  };
};
