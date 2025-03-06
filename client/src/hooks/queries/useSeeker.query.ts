import { createGenericQueryHook } from './createGenericQueryHook';
import { GetSeekerProfileDto, GetSeekersDto } from '@/types';
import {
  getSeekerById,
  getSeekerProfile,
  getSeekers,
} from '@/lib/actions/seekers.actions';

const SeekerQueryFunctions = {
  GET_SEEKER_PROFILE: (params: { query: GetSeekerProfileDto }) =>
    getSeekerProfile(params.query),
  GET_SEEKERS: (params: { query: GetSeekersDto }) => getSeekers(params.query),
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
