import { useQuery } from '@tanstack/react-query';

import { getApplications } from '@/lib/actions/applications.actions';

const useGetApplications = (
  jobId: string,
  params?: { [key: string]: string },
) => {
  return useQuery({
    queryKey: ['applications', jobId, params?.page, params?.status],
    queryFn: () => {
      return getApplications({
        jobId: jobId,
        page: Number(params?.page) || 1,
        status: params?.status || '',
      });
    },
  });
};

export { useGetApplications };
