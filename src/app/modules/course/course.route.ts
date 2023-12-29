import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { createCourseValidationSchema, updateCourseValidationSchema } from './course.validation';
import { CourseControllers } from './course.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  auth('admin'),
  validateRequest(createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/', CourseControllers.getCourses);
// router.get('/:courseId', CourseControllers.getCourse);
router.get('/best', CourseControllers.getBestCourse);
router.get('/:courseId/reviews', CourseControllers.getCourseReviews);

router.put(
  '/:courseId',
  auth('admin'),
  validateRequest(updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const CourseRoutes = router;
