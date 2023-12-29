import mongoose from 'mongoose';
import { TErrorDetails, TErrorResponse, TIssue } from '../interface/error';

export const duplicateError = (error: mongoose.Error.ValidationError): TErrorResponse => {
  const regex = /"(.*?)"/;
  const matches = error.message.match(regex);
  const issues: TIssue[] = [
    {
      path: '',
      message: `Duplicate value for ${matches![1]}`,
    },
  ];
  const errorDetails: TErrorDetails = {
    issues,
    name: error.name,
  };
  const errorMessage = issues.map((detail) => `${detail.path} ${detail.message}`).join(', ');
  return {
    success: false,
    message: 'Duplicate Entry',
    errorMessage,
    errorDetails,
  };
};
