import { useQuery } from '@tanstack/react-query';

import { getEmployerProfile } from '@/lib/actions/employers.actions';

const useGetEmployer = (params?: { [key: string]: string }) => {
  return useQuery({
    queryFn: () => {
      return getEmployerProfile({
        page: Number(params?.page) || 1,
        srt: params?.sort || '',
        search: params?.query || '',
        type: 'jobs',
      });
    },
    queryKey: ['profile', { params }],
  });
};

export { useGetEmployer };
