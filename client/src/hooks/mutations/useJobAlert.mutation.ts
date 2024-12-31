import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import { generateJobAlert } from '@/lib/actions/seekers.actions';

import { useToast } from '@/components/ui/info/use-toast';

const useJobAlert = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (formData: FormData | any) => {
      return generateJobAlert(formData);
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
