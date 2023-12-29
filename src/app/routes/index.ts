import express from 'express';
import { CategoryRoutes } from '../modules/category/category.route';
import { CourseRoutes } from '../modules/course/course.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const allRouts = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

allRouts.forEach((route) => router.use(route.path, route.route));

export default router;
