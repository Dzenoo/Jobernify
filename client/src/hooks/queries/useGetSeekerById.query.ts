import { useQuery } from '@tanstack/react-query';

import { getSeekerById } from '@/lib/actions/seekers.actions';

const useGetSeekerById = (seekerId: string) => {
  return useQuery({
    queryFn: () => {
      return getSeekerById(seekerId);
    },
    queryKey: ['seeker', { seekerId }],
  });
};

export { useGetSeekerById };
