import zod from "zod";

export const EditReviewEmployersSchemas = zod.object({
  job_position: zod.string().min(3).max(30),
  negativeReview: zod.string().min(3).max(300),
  positiveReview: zod.string().min(3).max(300),
});

export const ReviewEmployersSchemas = zod.object({
  job_position: zod.string().min(3).max(30),
  type: zod.enum(["Freelance", "Part-Time", "Full-Time", "Internship"]),
  time: zod.enum(["Less than 1", "1-2", "2-4", "4-7", "7-10", "10 or greater"]),
  negativeReview: zod.string().min(3).max(300),
  positiveReview: zod.string().min(3).max(300),
  technologies: zod
    .array(zod.string())
    .min(1, "At least one technology is required")
    .nonempty("Technologies cannot be empty"),
});
