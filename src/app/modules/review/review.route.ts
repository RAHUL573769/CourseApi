import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { ReviewControllers } from './review.controller';
import { createReviewValidationSchema } from './review.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(createReviewValidationSchema),
  ReviewControllers.createReview,
);
router.get('/', ReviewControllers.getReviews);

export const ReviewRoutes = router;
