import { createGenericQueryHook } from './createGenericQueryHook';
import {
  getApplications,
  getPresignedResumeUrl,
} from '@/lib/actions/applications.actions';

const ApplicationsQueryFunctions = {
  GET_PRESIGNED_RESUME_URL: (params: { applicationId: string }) =>
    getPresignedResumeUrl(params.applicationId),
  GET_APPLICATIONS: (params: {
    jobId: string;
    status: string;
    query: { page: number };
  }) => getApplications({ ...params, ...params.query }),
} as const;

enum ApplicationsQueryType {
  GET_PRESIGNED_RESUME_URL = 'GET_PRESIGNED_RESUME_URL',
  GET_APPLICATIONS = 'GET_APPLICATIONS',
}

const useApplicationsQuery = createGenericQueryHook(
  'applications',
  ApplicationsQueryFunctions,
);

export { useApplicationsQuery, ApplicationsQueryType };
