import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import { editEmployerProfile } from '@/lib/actions/employers.actions';

import { useAuthentication } from '../core/useAuthentication.hook';

import { useToast } from '@/components/ui/info/use-toast';

const useEditEmployer = () => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  return useMutation({
    mutationFn: (formData: FormData | any) => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return editEmployerProfile(formData, token);
    },
    onSuccess: (response) => {
      toast({ title: 'Success', description: response.message });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });
};

export { useEditEmployer };
