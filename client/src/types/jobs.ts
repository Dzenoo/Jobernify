import { JobLevel, JobPosition, JobType } from '@jobernify/shared';
import { Employer } from './employers';
import { Application } from './applications';

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
