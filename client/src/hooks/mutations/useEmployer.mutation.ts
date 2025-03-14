import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import {
  editEmployerProfile,
  deleteEmployerProfile,
} from '@/lib/actions/employers.actions';

import { useToast } from '@/components/ui/info/use-toast';

enum EmployerMutationType {
  EDIT_PROFILE = 'EDIT_PROFILE',
  DELETE_PROFILE = 'DELETE_PROFILE',
}

type EmployerMutationPayload =
  | {
      type: EmployerMutationType.EDIT_PROFILE;
      data: FormData;
    }
  | {
      type: EmployerMutationType.DELETE_PROFILE;
    };

const useEmployerMutation = (
  options?: Omit<
    UseMutationOptions<any, any, EmployerMutationPayload>,
    'mutationFn'
  >,
) => {
  const { toast } = useToast();

  const mutationFn = (payload: EmployerMutationPayload) => {
    switch (payload.type) {
      case EmployerMutationType.EDIT_PROFILE:
        return editEmployerProfile(payload.data);
      case EmployerMutationType.DELETE_PROFILE:
        return deleteEmployerProfile();
      default:
        throw new Error('Invalid mutation type');
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employers'] });
      toast({ title: 'Success', description: response.message });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
    ...options,
  });

  return mutation;
};

export { useEmployerMutation, EmployerMutationType };
