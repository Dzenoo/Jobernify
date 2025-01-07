import { useQuery } from '@tanstack/react-query';

import { getEmployerAnalyticsInfo } from '@/lib/actions/employers.actions';

const useGetEmployerAnalytics = () => {
  return useQuery({
    queryFn: () => {
      return getEmployerAnalyticsInfo();
    },
    queryKey: ['analytics'],
  });
};

export { useGetEmployerAnalytics };
