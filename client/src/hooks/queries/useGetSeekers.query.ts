import { useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../core/useAuthentication.hook';

import { getSeekers } from '@/lib/actions/seekers.actions';

const useGetSeekers = (params?: { [key: string]: string }) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getSeekers({
        token: token,
        page: Number(params?.page) || 1,
        search: params?.query || '',
        skills: params?.skills || '',
      });
    },
    queryKey: ['seekers', params],
  });
};

export { useGetSeekers };
