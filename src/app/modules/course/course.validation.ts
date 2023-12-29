import { z } from 'zod';

const tagValidationSchema = z.object({
  name: z.string().trim().min(1),
  isDeleted: z.boolean().default(false),
});

const detailsValidationSchema = z.object({
  level: z.string().trim().min(1),
  description: z.string().min(1),
});
const updateDetailsValidationSchema = z.object({
  level: z.string().trim().min(1).optional(),
  description: z.string().min(1).optional(),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1),
    instructor: z.string().trim().min(1),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(tagValidationSchema),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
    language: z.string().min(1),
    provider: z.string().min(1),
    details: detailsValidationSchema,
  }),
});

export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1).optional(),
    instructor: z.string().trim().min(1).optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(tagValidationSchema).optional(),
    startDate: z.string().min(1).optional(),
    endDate: z.string().min(1).optional(),
    language: z.string().min(1).optional(),
    provider: z.string().min(1).optional(),
    details: updateDetailsValidationSchema.optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
