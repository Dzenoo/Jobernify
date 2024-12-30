import { useQuery } from '@tanstack/react-query';

import { getSeekerProfile } from '@/lib/actions/seekers.actions';
import { getEmployerProfile } from '@/lib/actions/employers.actions';

const useFetchProfile = (userType: string | null, token: string | null) => {
  if (!userType || !token) return { data: null, isLoading: false };

  return useQuery({
    queryFn: async () => {
      if (userType === 'seeker') {
        return await getSeekerProfile(token);
      } else if (userType === 'employer') {
        return await getEmployerProfile({
          type: 'jobs',
          token: token,
        });
      }
    },
    queryKey: ['profile', userType],
  });
};

export { useFetchProfile };
