import { useQuery } from '@tanstack/react-query';

import { getSeekerProfile } from '@/lib/actions/seekers.actions';
import { getEmployerProfile } from '@/lib/actions/employers.actions';

const useFetchProfile = (userType: string | null) => {
  if (!userType) return { data: null, isLoading: false };

  return useQuery({
    queryFn: async () => {
      if (userType === 'seeker') {
        return await getSeekerProfile();
      } else if (userType === 'employer') {
        return await getEmployerProfile({
          type: 'jobs',
        });
      }
    },
    queryKey: ['profile', userType],
  });
};

export { useFetchProfile };
