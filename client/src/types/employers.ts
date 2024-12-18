import { CompanySize, IndustryType, Role } from '@jobernify/shared';
import { Job } from './jobs';
import { Seeker } from './seekers';

export type Employer = {
  _id: string;
  email: string;
  name: string;
  industry: keyof typeof IndustryType;
  size: keyof typeof CompanySize;
  address: string;
  image: string;
  companyDescription: string;
  website: string;
  role: keyof typeof Role;
  jobs: Job[];
  followers: Seeker[];
};
