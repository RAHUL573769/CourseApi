import { z } from 'zod';
import { USER_ROLE, strongPassword } from './user.constants';

// create user validation schema
export const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' })
      .refine((password) => strongPassword.uppercase.test(password), {
        message: 'Password must contain at least one uppercase letter.',
      })
      .refine((password) => strongPassword.lowercase.test(password), {
        message: 'Password must contain at least one lowercase letter.',
      })
      .refine((password) => strongPassword.digit.test(password), {
        message: 'Password must contain at least one digit 0-9.',
      })
      .refine((password) => strongPassword.special.test(password), {
        message: 'Password must contain at least one special character.',
      }),

    role: z.enum(Object.values(USER_ROLE) as [string, ...string[]]),
  }),
});

export const UserValidationSchema = {
  createUserValidationSchema,
};
