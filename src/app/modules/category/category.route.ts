import express from 'express';
import { CategoryController } from './category.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createCategoryValidationSchema } from './category.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(createCategoryValidationSchema),
  CategoryController.createCategory,
);
router.get('/', CategoryController.getCategories);

export const CategoryRoutes = router;
