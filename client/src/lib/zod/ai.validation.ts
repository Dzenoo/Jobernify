import { z } from 'zod';

export const AiFormSchema = z.object({
  question: z
    .string()
    .min(3)
    .max(1000)
    .trim()
    .refine((value) => value.length > 0),
});
