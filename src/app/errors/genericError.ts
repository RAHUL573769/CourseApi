import { TErrorDetails, TErrorResponse, TIssue } from '../interface/error';
import AppError from './AppError';

export const genericError = (error: AppError): TErrorResponse => {
  const issues: TIssue[] = [
    {
      path: '',
      message: error.message,
    },
  ];
  const errorDetails: TErrorDetails = {
    issues,
    name: error.name,
  };
  // genaret error message from error details
  const errorMessage = issues.map((detail) => `${detail.path}: ${detail.message}`).join(', ');
  return {
    success: false,
    message: 'App error',
    errorMessage,
    errorDetails,
  };
};
