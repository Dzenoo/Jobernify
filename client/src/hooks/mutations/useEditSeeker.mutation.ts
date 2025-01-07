import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import { editSeekerProfile } from '@/lib/actions/seekers.actions';

import { useToast } from '@/components/ui/info/use-toast';

const useEditSeeker = (showToast?: boolean) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (formData: FormData | any) => {
      return editSeekerProfile(formData);
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
