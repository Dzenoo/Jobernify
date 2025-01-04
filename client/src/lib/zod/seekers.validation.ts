import zod from 'zod';

import { jobLevels, jobPositions, jobTypes } from '@/constants';

/**
 * Schemas for validating the various forms and data structures used in the Seeker section of the app.
 */
export const SeekerProfileSchema = zod.object({
  /**
   * First name of the Seeker.
   * Must be between 2 and 30 characters long.
   */
  first_name: zod.string().min(2).max(30),
  /**
   * Last name of the Seeker.
   * Must be between 2 and 30 characters long.
   */
  last_name: zod.string().min(2).max(30),
  /**
   * Biography of the Seeker.
   * Must be at most 1000 characters long.
   */
  biography: zod.string().max(1000),
  /**
   * Headline of the Seeker.
   * Must be at most 30 characters long.
   */
  headline: zod.string().max(30),
});

export const SeekerSocialsSchema = zod.object({
  /**
   * URL of the Seeker's portfolio.
   * Must be a valid URL.
   * Optional.
   */
  portfolio: zod
    .string()
    .optional()
    .refine(
      (value) => !value || zod.string().max(255).url().safeParse(value).success,
      {
        message: 'Please enter a valid URL for the portfolio.',
      },
    ),
  /**
   * URL of the Seeker's LinkedIn profile.
   * Must be a valid URL.
   * Optional.
   */
  linkedin: zod
    .string()
    .optional()
    .refine(
      (value) => !value || zod.string().max(255).url().safeParse(value).success,
      {
        message: 'Please enter a valid URL for LinkedIn.',
      },
    ),
  /**
   * URL of the Seeker's GitHub profile.
   * Must be a valid URL.
   * Optional.
   */
  github: zod
    .string()
    .optional()
    .refine(
      (value) => !value || zod.string().max(255).url().safeParse(value).success,
      {
        message: 'Please enter a valid URL for GitHub.',
      },
    ),
});

export const AddEducationSchema = zod.object({
  /**
   * Name of the institution where the education was obtained.
   * Must be between 3 and 300 characters long.
   */
  institution: zod.string().min(3).max(300),
  /**
   * Field of study of the education.
   * Must be between 3 and 30 characters long.
   */
  fieldOfStudy: zod.string().min(3).max(30),
  /**
   * Degree obtained from the education.
   * Must be between 3 and 30 characters long.
   */
  degree: zod.string().min(3).max(30),
  /**
   * Date when the education was completed.
   * Must be a valid date.
   */
  graduationDate: zod.date(),
});

export const EditEducationSchema = zod.object({
  /**
   * Name of the institution where the education was obtained.
   * Must be between 3 and 300 characters long.
   * Optional.
   */
  institution: zod.string().min(3).max(300).optional(),
  /**
   * Field of study of the education.
   * Must be between 3 and 30 characters long.
   * Optional.
   */
  fieldOfStudy: zod.string().min(3).max(30).optional(),
  /**
   * Degree obtained from the education.
   * Must be between 3 and 30 characters long.
   * Optional.
   */
  degree: zod.string().min(3).max(30).optional(),
  /**
   * Date when the education was completed.
   * Must be a valid date.
   * Optional.
   */
  graduationDate: zod.date().optional(),
});

export const AddExperienceSchema = zod.object({
  /**
   * Title of the job.
   * Must be between 3 and 100 characters long.
   */
  jobTitle: zod.string().min(3).max(100),
  /**
   * Name of the company where the job was held.
   * Must be between 3 and 300 characters long.
   */
  companyName: zod.string().min(3).max(300),
  /**
   * Date when the job started.
   * Must be a valid date.
   */
  startDate: zod.date(),
  /**
   * Date when the job ended.
   * Must be a valid date.
   * Optional.
   */
  endDate: zod.date().optional(),
  /**
   * Level of the job.
   * Must be 'Junior', 'Medior', 'Senior', or 'Lead'.
   */
  level: zod.enum(jobLevels, {
    errorMap: () => ({
      message: "Level must be 'Junior', 'Medior', 'Senior', or 'Lead'.",
    }),
  }),
  /**
   * Type of the job.
   * Must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.
   */
  type: zod.enum(jobTypes, {
    errorMap: () => ({
      message:
        "Job type must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.",
    }),
  }),
  /**
   * Location of the job.
   * Must be between 3 and 100 characters long.
   */
  location: zod.string().min(3).max(100),
  /**
   * Position of the job.
   * Must be 'Remote', 'On-Site', or 'Hybrid'.
   */
  position: zod.enum(jobPositions, {
    errorMap: () => ({
      message: "Position must be 'Remote', 'On-Site', or 'Hybrid'.",
    }),
  }),
  /**
   * Whether the Seeker is currently working at the job.
   * Optional.
   */
  isCurrentlyWorking: zod.boolean().optional(),
});

export const EditExperienceSchema = zod.object({
  /**
   * Title of the job.
   * Must be between 3 and 100 characters long.
   * Optional.
   */
  jobTitle: zod.string().min(3).max(100).optional(),
  /**
   * Name of the company where the job was held.
   * Must be between 3 and 300 characters long.
   * Optional.
   */
  companyName: zod.string().min(3).max(300).optional(),
  /**
   * Date when the job started.
   * Must be a valid date.
   * Optional.
   */
  startDate: zod.date().optional(),
  /**
   * Date when the job ended.
   * Must be a valid date.
   * Optional.
   */
  endDate: zod.date().optional(),
  /**
   * Level of the job.
   * Must be 'Junior', 'Medior', 'Senior', or 'Lead'.
   * Optional.
   */
  level: zod
    .enum(jobLevels, {
      errorMap: () => ({
        message: "Level must be 'Junior', 'Medior', 'Senior', or 'Lead'.",
      }),
    })
    .optional(),
  /**
   * Type of the job.
   * Must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.
   * Optional.
   */
  type: zod
    .enum(jobTypes, {
      errorMap: () => ({
        message:
          "Job type must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.",
      }),
    })
    .optional(),
  /**
   * Location of the job.
   * Must be between 3 and 100 characters long.
   * Optional.
   */
  location: zod.string().min(3).max(100).optional(),
  /**
   * Position of the job.
   * Must be 'Remote', 'On-Site', or 'Hybrid'.
   * Optional.
   */
  position: zod
    .enum(jobPositions, {
      errorMap: () => ({
        message: "Position must be 'Remote', 'On-Site', or 'Hybrid'.",
      }),
    })
    .optional(),
  /**
   * Whether the Seeker is currently working at the job.
   * Optional.
   */
  isCurrentlyWorking: zod.boolean().optional(),
});

export const SkillsSchema = zod.object({
  /**
   * Array of skills of the Seeker.
   * Must be an array of strings.
   */
  skills: zod.array(zod.string()),
});

export const JobAlertSchema = zod.object({
  /**
   * Title of the job alert.
   * Must be between 3 and 30 characters long.
   */
  title: zod.string().min(3).max(30),
  /**
   * Type of the job alert.
   * Must be between 3 and 30 characters long.
   */
  type: zod.string().min(3).max(30),
  /**
   * Level of the job alert.
   * Must be between 3 and 30 characters long.
   */
  level: zod.string().min(3).max(30),
});

export const ReceiveJobAlertsSchema = zod.object({
  /**
   * Whether the Seeker wants to receive job alerts.
   * Must be a boolean.
   */
  receiveJobAlerts: zod.boolean(),
});
