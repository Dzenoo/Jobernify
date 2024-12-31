import { useQuery } from '@tanstack/react-query';

import { getJobById } from '@/lib/actions/jobs.actions';

const useGetJobById = (jobId: string) => {
  return useQuery({
    queryFn: () => {
      return getJobById(jobId);
    },
    queryKey: ['job', { jobId }],
  });
};

export { useGetJobById };
