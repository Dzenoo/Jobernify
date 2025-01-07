import { useQuery } from '@tanstack/react-query';

import { getSeekers } from '@/lib/actions/seekers.actions';

const useGetSeekers = (params?: { [key: string]: string }) => {
  return useQuery({
    queryFn: () => {
      return getSeekers({
        page: Number(params?.page) || 1,
        search: params?.query || '',
        skills: params?.skills || '',
      });
    },
    queryKey: ['seekers', params],
  });
};

export { useGetSeekers };
