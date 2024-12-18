import { useQuery } from '@tanstack/react-query';

import { getJobs } from '@/lib/actions/jobs.actions';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

const useGetJobs = ({ params }: { params: { [key: string]: string } }) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getJobs({
        token: token,
        page: Number(params?.page) || 1,
        limit: Number(params?.limit) || 10,
        sort: params?.sort || '',
        search: params?.query || '',
        type: params?.type || '',
        level: params?.level || '',
        salary: params?.salary || '',
        position: params?.position || '',
      });
    },
    queryKey: ['jobs', params],
  });
};

export { useGetJobs };
