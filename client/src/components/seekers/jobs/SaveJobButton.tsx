import React from 'react';

import { Bookmark } from 'lucide-react';

import { useMutation } from '@tanstack/react-query';

import {
  SeekerQueryType,
  useSeekerQuery,
} from '@/hooks/queries/useSeeker.query';

import { saveJob } from '@/lib/actions/jobs.actions';
import { queryClient } from '@/context/react-query-client';

import { IJob } from '@/types';

import { useToast } from '@/components/ui/info/use-toast';
import { Button } from '@/components/ui/buttons/button';

type SaveJobButtonProps = {
  jobId: string;
};

const SaveJobButton: React.FC<SaveJobButtonProps> = ({ jobId }) => {
  const { toast } = useToast();
  const { data } = useSeekerQuery({
    type: SeekerQueryType.GET_SEEKER_PROFILE,
    params: { query: {} },
  });

  const { mutateAsync: saveJobMutate, status } = useMutation({
    mutationFn: () => {
      return saveJob(jobId);
    },
    onSuccess: (response) => {
      toast({ title: 'Success', description: response.message });
      queryClient.invalidateQueries({ queryKey: ['seeker_profile'] });
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error.response.data.message });
    },
  });

  const isLoading = status === 'pending';

  const fetchedSeeker: any = data;

  const isJobSaved = fetchedSeeker?.seeker?.savedJobs.find(
    (job: IJob) => job._id === jobId,
  );

  return (
    <div>
      <Button
        variant="outline"
        onClick={async () => await saveJobMutate()}
        disabled={isLoading}
      >
        <Bookmark
          color={isJobSaved ? '#0066FF' : 'gray'}
          fill={isJobSaved ? '#0066FF' : '#ffffff'}
        />
      </Button>
    </div>
  );
};

export default SaveJobButton;
