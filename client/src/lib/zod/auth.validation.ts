import zod from 'zod';

import { companySizes, industries, PASSWORD_REGEX } from '@/constants';

export const SeekerRegistrationSchema = zod.object({
  first_name: zod
    .string()
    .min(2, { message: 'First Name must be at least 2 characters long' })
    .max(15, { message: 'First Name must be at most 15 characters long' })
    .regex(
      /^[A-Z][a-zA-Z\s]*$/,
      'First name must start with an uppercase letter',
    ),
  last_name: zod
    .string()
    .min(2, { message: 'Last Name must be at least 2 characters long' })
    .max(15, { message: 'Last Name must be at most 15 characters long' })
    .regex(
      /^[A-Z][a-zA-Z\s]*$/,
      'Last name must start with an uppercase letter',
    ),
  email: zod
    .string()
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(255, { message: 'Email must be at most 255 characters long' })
    .email(),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(
      PASSWORD_REGEX,
      'Password must be at least 8 characters long, start with uppercase letter and contain symbols and numbers',
    ),
});

export const EmployerRegistrationSchema = zod.object({
  name: zod
    .string()
    .min(5, { message: 'Name must be at least 5 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' })
    .regex(
      /^[A-Z][a-zA-Z\s-]*$/,
      'Name must start with an uppercase letter and can include letters, spaces, and hyphens',
    ),
  industry: zod.enum(industries, {
    message: 'Please select a valid industry',
  }),
  size: zod.enum(companySizes, {
    message: 'Please select a valid company size',
  }),
  address: zod
    .string()
    .min(5, { message: 'Address must be at least 5 characters long' })
    .max(50, { message: 'Address must be at most 50 characters long' }),
  email: zod
    .string()
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(255, { message: 'Email must be at most 255 characters long' })
    .email(),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(
      PASSWORD_REGEX,
      'Password must be at least 8 characters long, start with uppercase letter and contain symbols and numbers',
    ),
});

export const LoginSchema = zod.object({
  email: zod.string().min(1, { message: 'Email must not be empty' }).email(),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(
      PASSWORD_REGEX,
      'Password must be at least 8 characters long, start with uppercase letter and contain symbols and numbers',
    ),
});

export const Verify2FACodeSchema = zod.object({
  code: zod.string().min(6, {
    message: 'Your code must be 6 characters.',
  }),
});
