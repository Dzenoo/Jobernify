import zod from "zod";

export const SeekerProfileSchema = zod.object({
  first_name: zod.string().min(1).max(30),
  last_name: zod.string().min(1).max(30),
  biography: zod.string().max(3000),
  headline: zod.string().max(30),
});

export const SeekerSocialsSchema = zod.object({
  portfolio: zod
    .string()
    .optional()
    .refine((value) => !value || zod.string().url().safeParse(value).success, {
      message: "Please enter a valid URL for the portfolio.",
    }),
  linkedin: zod
    .string()
    .optional()
    .refine((value) => !value || zod.string().url().safeParse(value).success, {
      message: "Please enter a valid URL for LinkedIn.",
    }),
  github: zod
    .string()
    .optional()
    .refine((value) => !value || zod.string().url().safeParse(value).success, {
      message: "Please enter a valid URL for GitHub.",
    }),
});

export const AddEducationSchema = zod.object({
  institution: zod.string().min(3).max(300),
  fieldOfStudy: zod.string().min(3).max(30),
  degree: zod.string().min(3).max(30),
  graduationDate: zod.date(),
});

export const EditEducationSchema = zod.object({
  institution: zod.string().min(3).max(300).optional(),
  fieldOfStudy: zod.string().min(3).max(30).optional(),
  degree: zod.string().min(3).max(30).optional(),
  graduationDate: zod.date().optional(),
});

export const AddExperienceSchema = zod.object({
  jobTitle: zod.string().min(3).max(100),
  companyName: zod.string().min(3).max(300),
  startDate: zod.date(),
  endDate: zod.date().optional(),
  level: zod.enum(["Junior", "Medior", "Senior", "Lead"], {
    errorMap: () => ({
      message: "Level must be 'Junior', 'Medior', 'Senior', or 'Lead'.",
    }),
  }),
  type: zod.enum(["Internship", "Full-Time", "Part-Time", "Freelance"], {
    errorMap: () => ({
      message:
        "Job type must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.",
    }),
  }),
  location: zod.string().min(3).max(100),
  position: zod.enum(["Remote", "On-Site", "Hybrid"], {
    errorMap: () => ({
      message: "Position must be either 'Remote', 'On-Site', or 'Hybrid'.",
    }),
  }),
  isCurrentlyWorking: zod.boolean().optional(),
});

export const EditExperienceSchema = zod.object({
  jobTitle: zod.string().min(3).max(100).optional(),
  companyName: zod.string().min(3).max(300).optional(),
  startDate: zod.date().optional(),
  endDate: zod.date().optional(),
  level: zod
    .enum(["Junior", "Medior", "Senior", "Lead"], {
      errorMap: () => ({
        message: "Level must be 'Junior', 'Medior', 'Senior', or 'Lead'.",
      }),
    })
    .optional(),
  type: zod
    .enum(["Internship", "Full-Time", "Part-Time", "Freelance"], {
      errorMap: () => ({
        message:
          "Job type must be 'Internship', 'Full-Time', 'Part-Time', or 'Freelance'.",
      }),
    })
    .optional(),
  location: zod.string().min(3).max(100).optional(),
  position: zod
    .enum(["Remote", "On-Site", "Hybrid"], {
      errorMap: () => ({
        message: "Position must be either 'Remote', 'On-Site', or 'Hybrid'.",
      }),
    })
    .optional(),
  isCurrentlyWorking: zod.boolean().optional(),
});

export const SkillsSchema = zod.object({
  skills: zod.array(zod.string()),
});

export const JobAlertSchema = zod.object({
  title: zod.string().min(3).max(30),
  type: zod.string().min(3).max(30),
  level: zod.string().min(3).max(30),
});

export const ReceiveJobAlertsSchema = zod.object({
  receiveJobAlerts: zod.boolean(),
});
