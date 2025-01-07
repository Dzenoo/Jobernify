import { useQuery } from '@tanstack/react-query';

import { getJobs } from '@/lib/actions/jobs.actions';

const useGetJobs = (params?: { [key: string]: string }) => {
  return useQuery({
    queryFn: () => {
      return getJobs({
        page: Number(params?.page) || 1,
        limit: Number(params?.limit) || 10,
        sort: params?.sort || '',
        search: params?.query || '',
        type: params?.type || '',
        level: params?.level || '',
        salary: params?.salary || '',
        position: params?.position || '',
      });
    },
    queryKey: ['jobs', params],
  });
};

export { useGetJobs };
