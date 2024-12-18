import { useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../core/useAuthentication.hook';

import { getEmployers } from '@/lib/actions/employers.actions';

const useGetEmployers = (params?: { [key: string]: string }) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getEmployers({
        token: token,
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
