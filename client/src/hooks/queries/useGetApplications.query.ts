import { useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../core/useAuthentication.hook';

import { getApplications } from '@/lib/actions/applications.actions';

const useGetApplications = (
  jobId: string,
  params?: { [key: string]: string },
) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryKey: ['applications', jobId, params?.page, params?.status],
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getApplications({
        token: token,
        jobId: jobId,
        page: Number(params?.page) || 1,
        status: params?.status || '',
      });
    },
  });
};

export { useGetApplications };
