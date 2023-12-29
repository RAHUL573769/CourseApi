import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { createUserValidationSchema } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidationSchema } from './auth.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

// all user routes here

router.post('/register', validateRequest(createUserValidationSchema), AuthControllers.registerUser);
router.post(
  '/login',
  validateRequest(AuthValidationSchema.loginValidationSchema),
  AuthControllers.login,
);
router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(AuthValidationSchema.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
