import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getSeekerProfile } from '@/lib/actions/seekers.actions';

import { Seeker } from '@/types';

interface SeekerProfile {
  seeker: Seeker;
  totalSavedJobs: number;
  totalApplications: number;
}

const useGetSeeker = (
  page?: number,
  options?: UseQueryOptions<SeekerProfile>,
) => {
  return useQuery<SeekerProfile>({
    queryFn: () => {
      return getSeekerProfile(page);
    },
    queryKey: ['seeker_profile'],
    ...options,
  });
};

export { useGetSeeker };
