import { createGenericQueryHook } from './createGenericQueryHook';
import {
  getSeekerById,
  getSeekerProfile,
  getSeekers,
} from '@/lib/actions/seekers.actions';

const SeekerQueryFunctions = {
  GET_SEEKER_PROFILE: (params: { query: { page: number; limit: number } }) =>
    getSeekerProfile(params.query.page, params.query.limit),
  GET_SEEKERS: (params: {
    query: {
      page: number;
      skills?: string | string[];
      search?: string;
    };
  }) => getSeekers({ ...params.query }),
  GET_SEEKER_BY_ID: (params: { seekerId: string }) =>
    getSeekerById(params.seekerId),
} as const;

enum SeekerQueryType {
  GET_SEEKER_PROFILE = 'GET_SEEKER_PROFILE',
  GET_SEEKERS = 'GET_SEEKERS',
  GET_SEEKER_BY_ID = 'GET_SEEKER_BY_ID',
}

const useSeekerQuery = createGenericQueryHook('seekers', SeekerQueryFunctions);

export { useSeekerQuery, SeekerQueryType };
