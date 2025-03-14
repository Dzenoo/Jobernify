import { JobLevel, JobPosition, JobType } from '@/types';
import { IEmployer } from './employers.types';
import { IApplication } from './applications.types';

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

export interface IJob {
  _id: string;
  title: string;
  position: keyof typeof JobPosition;
  location: string;
  overview: string;
  type: keyof typeof JobType;
  skills: string[];
  level: keyof typeof JobLevel;
  employer: IEmployer;
  salary: number;
  expiration_date: string & Date;
  description: string;
  applications: IApplication[];
  createdAt: Date;
}
