import express from 'express';
// import { validateRequest } from '../../middlewares/validateRequest.ts';
// import { createUserValidationSchema } from './user.validation';
import { UserControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
const router = express.Router();

// all user routes here

router.get('/', auth('admin'), UserControllers.getUsers);

export const UserRoutes = router;
