import { useQuery } from '@tanstack/react-query';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { getJobById } from '@/lib/actions/jobs.actions';

const useGetJobById = (jobId: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getJobById(jobId, token);
    },
    queryKey: ['job', { jobId }],
  });
};

export { useGetJobById };
