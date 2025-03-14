import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { queryClient } from '@/context/react-query-client';
import {
  createNewJob,
  editJob,
  saveJob,
  deleteJob,
  generateCoverLetter,
} from '@/lib/actions/jobs.actions';

import { useToast } from '@/components/ui/info/use-toast';

enum JobMutationType {
  CREATE_NEW_JOB = 'CREATE_NEW_JOB',
  EDIT_JOB = 'EDIT_JOB',
  SAVE_JOB = 'SAVE_JOB',
  DELETE_JOB = 'DELETE_JOB',
  GENERATE_COVER_LETTER = 'GENERATE_COVER_LETTER',
}

type JobMutationPayload =
  | {
      type: JobMutationType.CREATE_NEW_JOB;
      data: FormData;
    }
  | {
      type: JobMutationType.EDIT_JOB;
      jobId: string;
      data: FormData;
    }
  | {
      type: JobMutationType.SAVE_JOB;
      jobId: string;
    }
  | {
      type: JobMutationType.DELETE_JOB;
      jobId: string;
    }
  | {
      type: JobMutationType.GENERATE_COVER_LETTER;
      jobId: string;
    };

const useJobMutation = (
  options?: Omit<
    UseMutationOptions<any, any, JobMutationPayload>,
    'mutationFn'
  >,
) => {
  const { toast } = useToast();

  const mutationFn = (payload: JobMutationPayload) => {
    switch (payload.type) {
      case JobMutationType.CREATE_NEW_JOB:
        return createNewJob(payload.data);
      case JobMutationType.EDIT_JOB:
        return editJob(payload.jobId, payload.data);
      case JobMutationType.SAVE_JOB:
        return saveJob(payload.jobId);
      case JobMutationType.DELETE_JOB:
        return deleteJob(payload.jobId);
      case JobMutationType.GENERATE_COVER_LETTER:
        return generateCoverLetter(payload.jobId);
      default:
        throw new Error('Invalid mutation type');
    }
  };

  const mutation = useMutation({
    mutationFn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Success', description: response.message });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
    ...options,
  });

  return mutation;
};

export { useJobMutation, JobMutationType };
