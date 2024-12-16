import {
  ApplicationStatus,
  CompanySize,
  IndustryType,
  JobLevel,
  JobPosition,
  JobType,
  Role,
} from '@jobernify/shared';

export enum TypeOfAccount {
  Seeker = 'seeker',
  Employer = 'employer',
  Default = '',
}

export type Employer = {
  _id: string;
  email: string;
  name: string;
  industry: IndustryType;
  size: CompanySize;
  address: string;
  image: string;
  companyDescription: string;
  website: string;
  role: Role;
  jobs: Job[];
  followers: Seeker[];
};

export type Job = {
  _id: string;
  title: string;
  position: JobPosition;
  location: string;
  overview: string;
  type: JobType;
  skills: string[];
  level: JobLevel;
  company: Employer;
  salary: number;
  expiration_date: string & Date;
  description: string;
  applications: Application[];
  createdAt: Date;
};

export type JobAlerts = {
  title: string;
  type: string;
  level: string;
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
  role: Role;
  receiveJobAlerts: boolean;
  savedJobs: Job[];
  applications: Application[];
  following: Employer[] & string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Application = {
  _id: string;
  cover_letter: string;
  status: keyof typeof ApplicationStatus;
  resume: string;
  seeker: Seeker;
  job: Job;
  createdAt: Date;
};

export type FilterCounts = {
  [key: string]: {
    _id: string;
    count: number;
  }[];
}[];

export type FilterGroup = {
  id: string;
  title: string;
  data: {
    id: string;
    title: string;
    value: string;
    type: string;
    count?: number;
  }[];
};
