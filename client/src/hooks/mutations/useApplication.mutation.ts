import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import {
  applyToJob,
  updateApplicationStatus,
} from '@/lib/actions/applications.actions';

import { useToast } from '@/components/ui/info/use-toast';

enum ApplicationMutationType {
  APPLY_TO_JOB = 'APPLY_TO_JOB',
  UPDATE_APPLICATION_STATUS = 'UPDATE_APPLICATION_STATUS',
}

type ApplicationMutation =
  | {
      type: ApplicationMutationType.APPLY_TO_JOB;
      jobId: string;
      data: FormData;
    }
  | {
      type: ApplicationMutationType.UPDATE_APPLICATION_STATUS;
      applicationId: string;
      status: string;
    };

const useApplicationMutation = (
  options?: Omit<
    UseMutationOptions<any, any, ApplicationMutation>,
    'mutationFn'
  >,
) => {
  const { toast } = useToast();

  const mutationFn = (payload: ApplicationMutation) => {
    switch (payload.type) {
      case ApplicationMutationType.APPLY_TO_JOB:
        return applyToJob(payload.jobId, payload.data);
      case ApplicationMutationType.UPDATE_APPLICATION_STATUS:
        return updateApplicationStatus(payload.applicationId, payload.status);
      default:
        throw new Error('Invalid mutation type');
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({ title: 'Success', description: response.message });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
    ...options,
  });

  return mutation;
};

export { useApplicationMutation, ApplicationMutationType };
