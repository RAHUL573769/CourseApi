import mongoose from 'mongoose';
import { TErrorDetails, TErrorResponse, TIssue } from '../interface/error';

export const validationError = (error: mongoose.Error.ValidationError): TErrorResponse => {
  // details about the error
  const issues: TIssue[] = [];
  const errorValues = Object.values(error.errors);
  // stracturing the error
  errorValues.forEach((issue) => {
    issues.push({
      path: issue.path,
      message: issue.message,
    });
  });

  const errorDetails: TErrorDetails = {
    issues,
    name: error.name,
  };
  const errorMessage = issues.map((detail) => `${detail.path} ${detail.message}`).join(', ');
  return {
    success: false,
    message: 'Validation Error',
    errorMessage,
    errorDetails,
  };
};
