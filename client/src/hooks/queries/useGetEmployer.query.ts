import { useQuery } from '@tanstack/react-query';

import { getEmployerProfile } from '@/lib/actions/employers.actions';

import { useAuthentication } from '../core/useAuthentication.hook';

const useGetEmployer = (params?: { [key: string]: string }) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getEmployerProfile({
        token: token,
        page: Number(params?.page) || 1,
        srt: params?.sort || '',
        search: params?.query || '',
        type: 'jobs',
      });
    },
    queryKey: ['profile', { params }],
    enabled: !!token,
  });
};

export { useGetEmployer };
