import zod from 'zod';

import { companySizes, industries, PASSWORD_REGEX } from '@/constants';
import { sanitizeInput } from '../utils';

/**
 * Schema for seeker registration validation.
 * Ensures that the seeker details adhere to the specified constraints.
 */
export const SeekerRegistrationSchema = zod.object({
  first_name: zod
    .string()
    .min(2, { message: 'First Name must be at least 2 characters long' })
    .max(15, { message: 'First Name must be at most 15 characters long' })
    .regex(
      /^[A-Z][a-zA-Z\s]*$/,
      'First name must start with an uppercase letter',
    )
    .transform((value) => sanitizeInput(value)),
  last_name: zod
    .string()
    .min(2, { message: 'Last Name must be at least 2 characters long' })
    .max(15, { message: 'Last Name must be at most 15 characters long' })
    .regex(
      /^[A-Z][a-zA-Z\s]*$/,
      'Last name must start with an uppercase letter',
    )
    .transform((value) => sanitizeInput(value)),
  email: zod
    .string()
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(255, { message: 'Email must be at most 255 characters long' })
    .email()
    .transform((value) => sanitizeInput(value)),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(
      PASSWORD_REGEX,
      'Password must be at least 8 characters long, start with uppercase letter and contain symbols and numbers',
    )
    .transform((value) => sanitizeInput(value)),
});

export const EmployerRegistrationSchema = zod.object({
  name: zod
    .string()
    .min(5, { message: 'Name must be at least 5 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' })
    .regex(
      /^[A-Z][a-zA-Z\s-]*$/,
      'Name must start with an uppercase letter and can include letters, spaces, and hyphens',
    )
    .transform((value) => sanitizeInput(value)),
  industry: zod.enum(industries, {
    message: 'Please select a valid industry',
  }),
  size: zod.enum(companySizes, {
    message: 'Please select a valid company size',
  }),
  address: zod
    .string()
    .min(5, { message: 'Address must be at least 5 characters long' })
    .max(50, { message: 'Address must be at most 50 characters long' })
    .transform((value) => sanitizeInput(value)),
  email: zod
    .string()
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(255, { message: 'Email must be at most 255 characters long' })
    .email()
    .transform((value) => sanitizeInput(value)),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(
      PASSWORD_REGEX,
      'Password must be at least 8 characters long, start with uppercase letter and contain symbols and numbers',
    )
    .transform((value) => sanitizeInput(value)),
});

/**
 * Schema for login validation.
 * Ensures that the login details adhere to the specified constraints.
 */
export const LoginSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email must not be empty' })
    .max(255, { message: 'Email must be at most 255 characters long' })
    .email()
    .transform((value) => sanitizeInput(value)),
  password: zod
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(
      PASSWORD_REGEX,
      'Password must be at least 8 characters long, start with uppercase letter and contain symbols and numbers',
    )
    .transform((value) => sanitizeInput(value)),
});

/**
 * Schema for 2FA code verification.
 * Ensures that the 2FA code adheres to the specified constraints.
 */
export const Verify2FACodeSchema = zod.object({
  code: zod
    .string()
    .min(6, {
      message: 'Your code must be 6 characters.',
    })
    .transform((value) => sanitizeInput(value)),
});
