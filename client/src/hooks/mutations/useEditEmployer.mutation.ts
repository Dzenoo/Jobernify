import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import { editEmployerProfile } from '@/lib/actions/employers.actions';

import { useToast } from '@/components/ui/info/use-toast';

const useEditEmployer = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (formData: FormData | any) => {
      return editEmployerProfile(formData);
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
