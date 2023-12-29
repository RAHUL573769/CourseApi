import { JsonWebTokenError } from 'jsonwebtoken';
import { TErrorResponse } from '../interface/error';
// import AppError from './AppError';

export const jwtError = (error: JsonWebTokenError): TErrorResponse => {
  // Customize the error handling based on your requirements
  const jwtError = error as JsonWebTokenError;

  let errorMessage: string;

  switch (jwtError.message) {
    case 'invalid token':
    case 'jwt malformed':
      errorMessage = 'Invalid token format';
      break;
    case 'jwt signature is required':
    case 'invalid signature':
      errorMessage = 'Invalid token signature';
      break;
    case 'jwt audience invalid':
      errorMessage = 'Invalid audience';
      break;
    case 'jwt issuer invalid':
      errorMessage = 'Invalid issuer';
      break;
    case 'jwt id invalid':
      errorMessage = 'Invalid JWT ID';
      break;
    case 'jwt subject invalid':
      errorMessage = 'Invalid subject';
      break;
    default:
      errorMessage = 'JsonWebTokenError: ' + jwtError.message;
      break;
  }
  return {
    success: false,
    message: 'Unauthorized Access',
    errorMessage,
    errorDetails: null,
    stack: null,
    stackDetails: null,
  };
};
