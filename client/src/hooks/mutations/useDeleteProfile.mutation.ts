import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/info/use-toast';
import { deleteSeekerProfile } from '@/lib/actions/seekers.actions';
import { deleteEmployerProfile } from '@/lib/actions/employers.actions';

const useDeleteProfile = (role: 'SEEKER' | 'EMPLOYER') => {
  const { toast } = useToast();

  const mutationFn = () => {
    return role === 'SEEKER' ? deleteSeekerProfile() : deleteEmployerProfile();
  };

  const mutation = useMutation({
    mutationFn,
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });

  return mutation;
};

export { useDeleteProfile };
