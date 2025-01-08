import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import { followEmployer } from '@/lib/actions/seekers.actions';

import { useToast } from '@/components/ui/info/use-toast';

const useFollowEmployer = (employerId: string) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => {
      return followEmployer(employerId);
    },
    mutationKey: ['profile', 'employer', 'employers'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['seeker_profile', 'employer', 'employers'],
      });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.response.data.message });
    },
  });
};

export { useFollowEmployer };
