import zod from 'zod';

import { companySizes, industries } from '@/constants';

/**
 * Schema for employer profile validation.
 * Ensures that the employer details adhere to the specified constraints.
 */
export const EmployerProfileSchema = zod.object({
  /**
   * Company name.
   * Must be between 5 and 50 characters long.
   */
  name: zod.string().min(5).max(50),
  /**
   * Company address.
   * Must be between 5 and 50 characters long.
   */
  address: zod.string().min(5).max(50),
  /**
   * Company industry.
   * Must be one of the valid industries in the constants file.
   */
  industry: zod.enum(industries, {
    message: 'Please select valid industry',
  }),
  /**
   * Company website.
   * Must be at most 30 characters long.
   */
  website: zod.string().max(30),
  /**
   * Company size.
   * Must be one of the valid company sizes in the constants file.
   */
  size: zod.enum(companySizes, { message: 'Please select valid size' }),
  /**
   * Company description.
   * Must be at most 300 characters long.
   */
  companyDescription: zod.string().max(300),
});
