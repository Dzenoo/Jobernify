import { useQuery } from '@tanstack/react-query';

import { getEmployerProfile } from '@/lib/actions/employers.actions';

import { useAuthentication } from '../core/useAuthentication.hook';
import { Employer } from '@/types';

const useGetEmployer = (type?: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery<{
    counts: { totalJobs: number };
    employer: Employer;
  }>({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getEmployerProfile({
        token: token,
        type: type,
      });
    },
    queryKey: ['profile'],
    enabled: !!token,
  });
};

export { useGetEmployer };
