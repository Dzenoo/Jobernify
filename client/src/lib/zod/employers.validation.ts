import zod from 'zod';

import { CompanySize, IndustryType } from '@jobernify/shared';

export const EmployerProfileSchema = zod.object({
  name: zod.string().min(5).max(50),
  address: zod.string().min(5).max(50),
  industry: zod.nativeEnum(IndustryType, {
    message: 'Please select valid industry',
  }),
  website: zod.string().max(30),
  size: zod.nativeEnum(CompanySize, { message: 'Please select valid size' }),
  companyDescription: zod.string().max(300),
});
