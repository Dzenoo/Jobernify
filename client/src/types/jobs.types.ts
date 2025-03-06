import { JobLevel, JobPosition, JobType } from '@/types';
import { Employer } from './employers.types';
import { Application } from './applications.types';

export type GetJobsDto = {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  salary?: string;
  type?: string;
  level?: string;
  position?: string;
};

export type Job = {
  _id: string;
  title: string;
  position: keyof typeof JobPosition;
  location: string;
  overview: string;
  type: keyof typeof JobType;
  skills: string[];
  level: keyof typeof JobLevel;
  employer: Employer;
  salary: number;
  expiration_date: string & Date;
  description: string;
  applications: Application[];
  createdAt: Date;
};
