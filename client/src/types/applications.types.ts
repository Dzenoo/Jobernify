import { ApplicationStatus } from '@/types';
import { Seeker } from './seekers.types';
import { Job } from './jobs.types';

export type GetApplicationsDto = {
  status: string;
  page: number;
};

export interface IApplication {
  _id: string;
  cover_letter: string;
  status: keyof typeof ApplicationStatus;
  resume: string;
  seeker: Seeker;
  job: Job;
  createdAt: Date;
}
