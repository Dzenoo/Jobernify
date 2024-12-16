import zod from 'zod';
import DOMPurify from 'dompurify';

import { jobLevels, jobPositions, jobTypes } from '@/constants';

export const ApplyToJobSchema = zod.object({
  coverLetter: zod.string().optional(),
});

export const UpdateJobSchema = zod.object({
  title: zod
    .string()
    .min(3, 'Title should have at least 3 characters.')
    .max(30, 'Title can be up to 30 characters long.')
    .trim(),
  position: zod.enum(jobPositions, {
    errorMap: () => ({
      message: "Position must be either 'Remote', 'On-Site', or 'Hybrid'.",
    }),
  }),
  location: zod
    .string()
    .min(3, 'Location should have at least 3 characters.')
    .max(30, 'Location can be up to 30 characters long.')
    .trim(),
  overview: zod
    .string()
    .min(
      30,
      'Overview should have at least 30 characters to provide sufficient detail.',
    )
    .max(300, 'Overview can be up to 300 characters long.')
    .trim(),
  type: zod.enum(jobTypes, {
    errorMap: () => ({
      message:
        "Job type must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.",
    }),
  }),
  skills: zod.array(
    zod
      .string()
      .min(1, 'Each skill must have at least 1 character.')
      .max(25, 'Each skill can be up to 25 characters long.')
      .trim(),
  ),
  level: zod.enum(jobLevels, {
    errorMap: () => ({
      message: "Level must be 'Junior', 'Medior', 'Senior', or 'Lead'.",
    }),
  }),
  salary: zod
    .number()
    .min(100, 'Salary should be at least $100.')
    .nonnegative('Salary must be a positive number.'),
  expiration_date: zod.any(),
  description: zod
    .string()
    .max(2500, 'Description can be up to 2500 characters long.')
    .refine(
      (value) => {
        const plainText = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
        return plainText.trim().length >= 30;
      },
      { message: 'Description should be at least 30 characters long.' },
    ),
});
