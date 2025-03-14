import React from 'react';
import { Bookmark } from 'lucide-react';

import {
  SeekerQueryType,
  useSeekerQuery,
} from '@/hooks/queries/useSeeker.query';
import {
  JobMutationType,
  useJobMutation,
} from '@/hooks/mutations/useJob.mutation';
import { queryClient } from '@/context/react-query-client';
import { IJob } from '@/types';

import { Button } from '@/components/ui/buttons/button';

type SaveJobButtonProps = {
  jobId: string;
};

const SaveJobButton: React.FC<SaveJobButtonProps> = ({ jobId }) => {
  const { data } = useSeekerQuery({
    type: SeekerQueryType.GET_SEEKER_PROFILE,
    params: { query: {} },
  });

  const mutation = useJobMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seekers'] });
    },
  });

  const isLoading = mutation.status === 'pending';

  const isJobSaved = data?.seeker?.savedJobs.find(
    (job: IJob) => job._id === jobId,
  );

  function handleSaveJob() {
    mutation.mutateAsync({
      type: JobMutationType.SAVE_JOB,
      jobId: jobId,
    });
  }

  return (
    <div>
      <Button variant="outline" onClick={handleSaveJob} disabled={isLoading}>
        <Bookmark
          color={isJobSaved ? '#0066FF' : 'gray'}
          fill={isJobSaved ? '#0066FF' : '#ffffff'}
        />
      </Button>
    </div>
  );
};

export default SaveJobButton;
