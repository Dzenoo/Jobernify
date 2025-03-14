import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import {
  editSeekerProfile,
  deleteSeekerProfile,
  followEmployer,
  generateJobAlert,
} from '@/lib/actions/seekers.actions';

import { useToast } from '@/components/ui/info/use-toast';

enum SeekerMutationType {
  EDIT_PROFILE = 'EDIT_PROFILE',
  DELETE_PROFILE = 'DELETE_PROFILE',
  FOLLOW_EMPLOYER = 'FOLLOW_EMPLOYER',
  GENERATE_JOB_ALERT = 'GENERATE_JOB_ALERT',
}

type SeekerMutationPayload =
  | {
      type: SeekerMutationType.EDIT_PROFILE;
      data: FormData;
    }
  | {
      type: SeekerMutationType.DELETE_PROFILE;
    }
  | {
      type: SeekerMutationType.FOLLOW_EMPLOYER;
      employerId: string;
    }
  | {
      type: SeekerMutationType.GENERATE_JOB_ALERT;
      data: FormData;
    };

const useSeekerMutation = (
  options?: Omit<
    UseMutationOptions<any, any, SeekerMutationPayload>,
    'mutationFn'
  >,
) => {
  const { toast } = useToast();

  const mutationFn = (payload: SeekerMutationPayload) => {
    switch (payload.type) {
      case SeekerMutationType.EDIT_PROFILE:
        return editSeekerProfile(payload.data);
      case SeekerMutationType.DELETE_PROFILE:
        return deleteSeekerProfile();
      case SeekerMutationType.FOLLOW_EMPLOYER:
        return followEmployer(payload.employerId);
      case SeekerMutationType.GENERATE_JOB_ALERT:
        return generateJobAlert(payload.data);
      default:
        throw new Error('Invalid mutation type');
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['seekers'] });
      toast({ title: 'Success', description: response.message });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
    ...options,
  });

  return mutation;
};

export { useSeekerMutation, SeekerMutationType };
