import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '@/lib/actions/auth.actions';

const useCurrentUser = () => {
  return useQuery({
    queryFn: async () => {
      return await getCurrentUser();
    },
    queryKey: ['currentUser'],
  });
};

export { useCurrentUser };
