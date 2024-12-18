import { useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../core/useAuthentication.hook';

import { getEmployerAnalyticsInfo } from '@/lib/actions/employers.actions';

const useGetEmployerAnalytics = () => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getEmployerAnalyticsInfo(token);
    },
    queryKey: ['analytics'],
  });
};

export { useGetEmployerAnalytics };
