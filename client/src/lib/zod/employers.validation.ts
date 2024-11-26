import zod from "zod";

import { industries } from "@/constants";

export const EmployerProfileSchema = zod.object({
  name: zod.string().min(5).max(50),
  address: zod.string().min(5).max(50),
  industry: zod.enum(
    industries.map((industry) => industry.value) as [string, ...string[]],
    { message: "Please select valid industry" }
  ),
  website: zod.string().max(30),
  size: zod.enum(
    ["", "Less-than-17", "20-50", "50-100", "100-250", "250-500", "500-1000"],
    { message: "Please select valid size" }
  ),
  companyDescription: zod.string().max(300),
});
