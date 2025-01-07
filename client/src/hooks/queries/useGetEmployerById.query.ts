import { useQuery } from '@tanstack/react-query';

import { getEmployerById } from '@/lib/actions/employers.actions';

const useGetEmployerById = (
  employerId: string,
  params?: { [key: string]: string },
) => {
  return useQuery({
    queryFn: () => {
      return getEmployerById(
        employerId,
        params?.section,
        Number(params?.page) || 1,
      );
    },
    queryKey: ['employer', employerId, params?.section, params?.page],
  });
};

export { useGetEmployerById };
