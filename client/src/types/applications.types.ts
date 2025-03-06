import { ApplicationStatus } from '@/types';
import { Seeker } from './seekers.types';
import { IJob } from './jobs.types';

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
  job: IJob;
  createdAt: Date;
}
