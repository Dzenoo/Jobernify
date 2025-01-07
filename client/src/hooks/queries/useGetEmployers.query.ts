import { useQuery } from '@tanstack/react-query';

import { getEmployers } from '@/lib/actions/employers.actions';

const useGetEmployers = (params?: { [key: string]: string }) => {
  return useQuery({
    queryFn: () => {
      return getEmployers({
        page: Number(params?.page) || 1,
        sort: params?.sort || '',
        search: params?.query || '',
        industry: params?.industry || '',
        size: params?.size || '',
        location: params?.location || '',
      });
    },
    queryKey: ['employers', params],
  });
};

export { useGetEmployers };
