import { CompanySize, IndustryType, Role } from '@/types';
import { IJob } from './jobs.types';
import { ISeeker } from './seekers.types';

export type GetEmployerProfileDto = {
  page?: number;
  sort?: string;
  search?: string;
  type?: string;
};

export type GetEmployersDto = {
  page?: number;
  sort?: string;
  search?: string;
  industry?: string;
  size?: string;
  location?: string;
};

export type GetEmployerByIdDto = {
  type: string;
  page: number;
};

export interface IEmployer {
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
  jobs: IJob[];
  followers: ISeeker[];
  isApproved: boolean;
  isTwoFactorAuthEnabled: boolean;
}
