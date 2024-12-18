import { useQuery } from '@tanstack/react-query';

import { useAuthentication } from '../core/useAuthentication.hook';

import { getEmployerById } from '@/lib/actions/employers.actions';

const useGetEmployerById = (
  employerId: string,
  params?: { [key: string]: string },
) => {
  const { token } = useAuthentication().getCookieHandler();

  return useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getEmployerById(
        employerId,
        token,
        params?.section,
        Number(params?.page) || 1,
      );
    },
    queryKey: ['employer', employerId, params?.section, params?.page],
  });
};

export { useGetEmployerById };
