import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import { editSeekerProfile } from '@/lib/actions/seekers.actions';

import { useAuthentication } from '../core/useAuthentication.hook';

import { useToast } from '@/components/ui/info/use-toast';

const useEditSeeker = (showToast?: boolean) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: (formData: FormData | any) => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return editSeekerProfile(formData, token);
    },
    onSuccess: (response) => {
      showToast && toast({ title: 'Success', description: response.message });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });
};

export { useEditSeeker };
