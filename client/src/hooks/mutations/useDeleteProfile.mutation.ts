import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/info/use-toast';
import { deleteSeekerProfile } from '@/lib/actions/seekers.actions';
import { deleteEmployerProfile } from '@/lib/actions/employers.actions';
import { useAuthentication } from '../core/useAuthentication.hook';

const useDeleteProfile = (role: 'SEEKER' | 'EMPLOYER') => {
  const { token } = useAuthentication().getCookieHandler();
  const { toast } = useToast();

  const mutationFn = () => {
    if (!token) {
      throw new Error('Unauthorized!');
    }

    return role === 'SEEKER'
      ? deleteSeekerProfile(token)
      : deleteEmployerProfile({ token });
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
