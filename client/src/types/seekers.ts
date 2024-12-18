import { JobLevel, JobPosition, JobType, Role } from '@jobernify/shared';
import { Job } from './jobs';
import { Application } from './applications';
import { Employer } from './employers';

export type Seeker = {
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
  education: Education[];
  experience: Experience[];
  alerts: JobAlerts;
  resume?: string;
  role: keyof typeof Role;
  receiveJobAlerts: boolean;
  savedJobs: Job[];
  applications: Application[];
  following: Employer[] & string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Education = {
  _id: string;
  institution: string;
  graduationDate: Date;
  fieldOfStudy: string;
  degree: string;
};

export type Experience = {
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
};

export type JobAlerts = {
  title: string;
  type: string;
  level: string;
};
