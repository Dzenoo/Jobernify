import { z } from 'zod';
import { sanitizeInput } from '@/lib/utils';

/**
 * Schema for validating the AI form data
 */
export const AiFormSchema = z.object({
  question: z
    .string()
    .min(3)
    .max(1000)
    .trim()
    .refine((value) => value.length > 0, {
      message: 'Question must not be empty',
    })
    .transform((value) => sanitizeInput(value)),
});
