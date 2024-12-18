import { ApplicationStatus } from '@jobernify/shared';
import { Seeker } from './seekers.types';
import { Job } from './jobs.types';

export type Application = {
  _id: string;
  cover_letter: string;
  status: keyof typeof ApplicationStatus;
  resume: string;
  seeker: Seeker;
  job: Job;
  createdAt: Date;
};
