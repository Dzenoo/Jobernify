import { useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../core/useAuthentication.hook';

import { getSeekerById } from '@/lib/actions/seekers.actions';

const useGetSeekerById = (seekerId: string) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getSeekerById(seekerId, token);
    },
    queryKey: ['seeker', { seekerId }],
  });
};

export { useGetSeekerById };
