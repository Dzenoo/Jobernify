import { z } from 'zod';

/**
 * Schema for validating the AI form data
 */
export const AiFormSchema = z.object({
  /**
   * The question to be asked to the AI
   */
  question: z
    .string()
    .min(3)
    .max(1000)
    .trim()
    .refine((value) => value.length > 0, {
      message: 'Question must not be empty',
    }),
});
