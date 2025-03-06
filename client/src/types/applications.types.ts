import { ApplicationStatus } from '@/types';
import { ISeeker } from './seekers.types';
import { IJob } from './jobs.types';

export type GetApplicationsDto = {
  status?: string;
  page?: number;
};

export interface IApplication {
  _id: string;
  cover_letter: string;
  status: keyof typeof ApplicationStatus;
  resume: string;
  seeker: ISeeker;
  job: IJob;
  createdAt: Date;
}
