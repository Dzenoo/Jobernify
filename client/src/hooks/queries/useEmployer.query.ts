import { createGenericQueryHook } from './createGenericQueryHook';
import {
  GetEmployerByIdDto,
  GetEmployerProfileDto,
  GetEmployersDto,
} from '@/types';
import {
  getEmployerAnalyticsInfo,
  getEmployerById,
  getEmployerProfile,
  getEmployers,
} from '@/lib/actions/employers.actions';

const EmployerQueryFunctions = {
  GET_EMPLOYER_PROFILE: (params: { query: GetEmployerProfileDto }) =>
    getEmployerProfile(params.query),
  GET_EMPLOYER_ANALYTICS_INFO: () => getEmployerAnalyticsInfo(),
  GET_EMPLOYERS: (params: { query: GetEmployersDto }) =>
    getEmployers(params.query),
  GET_EMPLOYER_BY_ID: (params: {
    employerId: string;
    query: GetEmployerByIdDto;
  }) => getEmployerById(params.employerId, params.query),
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
