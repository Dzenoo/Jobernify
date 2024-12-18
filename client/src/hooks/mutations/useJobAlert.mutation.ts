import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import { generateJobAlert } from '@/lib/actions/seekers.actions';

import { useAuthentication } from '../core/useAuthentication.hook';

import { useToast } from '@/components/ui/use-toast';

const useJobAlert = () => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: (formData: FormData | any) => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return generateJobAlert(formData, token);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast({ title: 'Success', description: response.message });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.data?.response?.message });
    },
  });
};

export { useJobAlert };
