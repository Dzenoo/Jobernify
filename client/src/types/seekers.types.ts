import { JobLevel, JobPosition, JobType, Role } from '@/types';
import { IJob } from './jobs.types';
import { IApplication } from './applications.types';
import { IEmployer } from './employers.types';

export type GetSeekerProfileDto = {
  page?: number;
  limit?: number;
};

export type GetSeekersDto = {
  page: number;
  skills?: string | string[];
  search?: string;
};

export interface ISeeker {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  headline: string;
  biography: string;
  image: string;
  password: string;
  portfolio: string;
  linkedin: string;
  github: string;
  skills: string[];
  education: IEducation[];
  experience: IExperience[];
  alerts: JobAlerts;
  resume?: string;
  role: keyof typeof Role;
  receiveJobAlerts: boolean;
  savedJobs: IJob[];
  applications: IApplication[];
  following: IEmployer[] & string[];
  createdAt: Date;
  updatedAt: Date;
  isTwoFactorAuthEnabled: boolean;
}

export interface IEducation {
  _id: string;
  institution: string;
  graduationDate: Date;
  fieldOfStudy: string;
  degree: string;
}

export interface IExperience {
  _id: string;
  jobTitle: string;
  companyName: string;
  startDate: Date;
  endDate: Date;
  level: keyof typeof JobLevel;
  type: keyof typeof JobType;
  location: string;
  position: keyof typeof JobPosition;
  isCurrentlyWorking: boolean;
}

export type JobAlerts = {
  title: string;
  type: string;
  level: string;
};
