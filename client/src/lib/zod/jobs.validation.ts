import zod from 'zod';
import DOMPurify from 'dompurify';

import { jobLevels, jobPositions, jobTypes } from '@/constants';

/**
 * Schema for applying to a job.
 * Ensures that the application details adhere to the specified constraints.
 */
export const ApplyToJobSchema = zod.object({
  /**
   * Cover letter for the job application.
   * It's optional.
   */
  coverLetter: zod.string().optional(),
});

/**
 * Schema for updating a job.
 * Ensures that the job details adhere to the specified constraints.
 */
export const UpdateJobSchema = zod.object({
  /**
   * Job title.
   * Must be between 3 and 30 characters long.
   */
  title: zod
    .string()
    .min(3, 'Title should have at least 3 characters.')
    .max(30, 'Title can be up to 30 characters long.')
    .trim(),
  /**
   * Job position.
   * Must be either 'Remote', 'On-Site', or 'Hybrid'.
   */
  position: zod.enum(jobPositions, {
    errorMap: () => ({
      message: "Position must be either 'Remote', 'On-Site', or 'Hybrid'.",
    }),
  }),
  /**
   * Job location.
   * Must be between 3 and 30 characters long.
   */
  location: zod
    .string()
    .min(3, 'Location should have at least 3 characters.')
    .max(30, 'Location can be up to 30 characters long.'),
  /**
   * Job overview.
   * Must be between 30 and 300 characters long.
   */
  overview: zod
    .string()
    .min(
      30,
      'Overview should have at least 30 characters to provide sufficient detail.',
    )
    .max(300, 'Overview can be up to 300 characters long.')
    .trim(),
  /**
   * Job type.
   * Must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.
   */
  type: zod.enum(jobTypes, {
    errorMap: () => ({
      message:
        "Job type must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.",
    }),
  }),
  /**
   * Required skills for the job.
   * Each skill must be between 1 and 25 characters long.
   */
  skills: zod.array(
    zod
      .string()
      .min(1, 'Each skill must have at least 1 character.')
      .max(25, 'Each skill can be up to 25 characters long.')
      .trim(),
  ),
  /**
   * Job level.
   * Must be 'Junior', 'Medior', 'Senior', or 'Lead'.
   */
  level: zod.enum(jobLevels, {
    errorMap: () => ({
      message: "Level must be 'Junior', 'Medior', 'Senior', or 'Lead'.",
    }),
  }),
  /**
   * Salary for the job.
   * Must be a positive number and at least $100.
   */
  salary: zod
    .number()
    .min(100, 'Salary should be at least $100.')
    .nonnegative('Salary must be a positive number.'),
  /**
   * Expiration date for the job posting.
   */
  expiration_date: zod.any(),
  /**
   * Job description.
   * Must be up to 2500 characters long and at least 30 characters after removing HTML tags.
   */
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
