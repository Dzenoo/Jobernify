import { createGenericQueryHook } from './createGenericQueryHook';
import { getJobById, getJobs } from '@/lib/actions/jobs.actions';

const JobQueryFunctions = {
  GET_JOBS: (params: {
    query: {
      page?: number;
      limit?: number;
      sort?: string;
      search?: string;
      salary?: string;
      type?: string;
      level?: string;
      position?: string;
    };
  }) => getJobs({ ...params.query }),
  GET_JOB_BY_ID: (params: { jobId: string }) => getJobById(params.jobId),
} as const;

enum JobQueryType {
  GET_JOBS = 'GET_JOBS',
  GET_JOB_BY_ID = 'GET_JOB_BY_ID',
}

const useJobQuery = createGenericQueryHook('jobs', JobQueryFunctions);

export { useJobQuery, JobQueryType };
