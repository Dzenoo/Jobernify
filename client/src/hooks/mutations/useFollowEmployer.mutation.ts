import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import { followEmployer } from '@/lib/actions/seekers.actions';

import { useAuthentication } from '../core/useAuthentication.hook';

import { useToast } from '@/components/ui/info/use-toast';

const useFollowEmployer = (employerId: string) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return followEmployer(employerId, token);
    },
    mutationKey: ['profile', 'employer', 'employers'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', 'employer', 'employers'],
      });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.response.data.message });
    },
  });
};

export { useFollowEmployer };
