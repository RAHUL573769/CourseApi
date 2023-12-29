import { z } from 'zod';
import { strongPassword } from '../user/user.constants';

export const loginValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
export const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string(),
    newPassword: z
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
  }),
});

export const AuthValidationSchema = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
