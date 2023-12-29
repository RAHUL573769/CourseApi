import { z } from 'zod';

export const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
    rating: z.number().gt(0).max(5),
    review: z.string(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
};
