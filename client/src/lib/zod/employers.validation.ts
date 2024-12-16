import zod from 'zod';

import { companySizes, industries } from '@/constants';

export const EmployerProfileSchema = zod.object({
  name: zod.string().min(5).max(50),
  address: zod.string().min(5).max(50),
  industry: zod.enum(industries, {
    message: 'Please select valid industry',
  }),
  website: zod.string().max(30),
  size: zod.enum(companySizes, { message: 'Please select valid size' }),
  companyDescription: zod.string().max(300),
});
