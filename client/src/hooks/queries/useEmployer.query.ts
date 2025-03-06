import { createGenericQueryHook } from './createGenericQueryHook';
import {
  getEmployerAnalyticsInfo,
  getEmployerById,
  getEmployerProfile,
  getEmployers,
} from '@/lib/actions/employers.actions';

const EmployerQueryFunctions = {
  GET_EMPLOYER_PROFILE: (params: {
    query: {
      page?: number;
      sort?: string;
      search?: string;
      type?: string;
    };
  }) => getEmployerProfile({ ...params.query }),
  GET_EMPLOYER_ANALYTICS_INFO: () => getEmployerAnalyticsInfo(),
  GET_EMPLOYERS: (params: {
    query: {
      page: number;
      sort: string;
      search: string;
      industry: string;
      size: string;
      location: string;
    };
  }) => getEmployers({ ...params.query }),
  GET_EMPLOYER_BY_ID: (params: {
    employerId: string;
    query: {
      type: string;
      page: number;
    };
  }) =>
    getEmployerById(params.employerId, params.query.type, params.query.page),
} as const;

enum EmployerQueryType {
  GET_EMPLOYER_PROFILE = 'GET_EMPLOYER_PROFILE',
  GET_EMPLOYER_ANALYTICS_INFO = 'GET_EMPLOYER_ANALYTICS_INFO',
  GET_EMPLOYERS = 'GET_EMPLOYERS',
  GET_EMPLOYER_BY_ID = 'GET_EMPLOYER_BY_ID',
}

const useEmployerQuery = createGenericQueryHook(
  'employers',
  EmployerQueryFunctions,
);

export { useEmployerQuery, EmployerQueryType };
