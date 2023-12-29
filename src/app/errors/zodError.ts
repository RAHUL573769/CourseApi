import { TErrorDetails, TErrorResponse, TIssue } from '../interface/error';
import { ZodError } from 'zod';

export const zodError = (error: ZodError): TErrorResponse => {
  // details about the error
  const issues: TIssue[] = error.issues.map((issue) => {
    return {
      ...issue,
    };
  });

  const errorDetails: TErrorDetails = {
    issues,
    name: error.name,
  };
  // genaret error message from error details
  const errorMessage = issues.map((detail) => `${detail.path} ${detail.message}`).join(', ');
  return {
    success: false,
    message: 'ZodError',
    errorMessage,
    errorDetails,
  };
};
