import { z, ZodObject, ZodRawShape } from 'zod';

export const SignUpSchema: ZodObject<ZodRawShape> = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
  profile: z.string().url().optional(),
});

export const SignInSchema: ZodObject<ZodRawShape> = z.object({
  usernameOrEmail: z.string({
    required_error: 'Username or email is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});
