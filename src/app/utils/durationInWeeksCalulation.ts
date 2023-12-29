import httpStatus from 'http-status';
import AppError from '../errors/AppError';

export const durationInWeeksCalulation = (start: string, end: string): number => {
  // converting to milliseconds
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (startDate > endDate) {
    throw new AppError(httpStatus.BAD_REQUEST, 'End date must be greater than start date');
  }
  const diffrenceInTime = endDate.getTime() - startDate.getTime();

  // Calculate duretion in days
  const days = diffrenceInTime / (1000 * 3600 * 24);
  const weeks = Math.ceil(days / 7);
  return weeks;
};
