import React from 'react';

import {
  JobMutationType,
  useJobMutation,
} from '@/hooks/mutations/useJob.mutation';
import { queryClient } from '@/context/react-query-client';

import Loader from '@/components/shared/ui/Loader';

import { Button } from '@/components/ui/buttons/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/layout/dialog';
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/layout/drawer';

type DeleteJobProps = {
  onClose: () => void;
  id: string;
  isDialog: boolean;
};

const DeleteJob: React.FC<DeleteJobProps> = ({ onClose, id, isDialog }) => {
  const mutation = useJobMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employers'] });
      onClose();
    },
  });

  const isLoading = status === 'pending';

  const onDeleteJob = () => {
    mutation.mutateAsync({
      type: JobMutationType.DELETE_JOB,
      jobId: id,
    });
  };

  const title = 'Delete Job';
  const description =
    'Deleting this job will remove it from the platform, including all associated applications and information. Seekers will no longer be able to apply. Are you sure you want to proceed?';
  const button = (
    <Button
      variant="destructive"
      type="submit"
      className="w-full"
      onClick={onDeleteJob}
    >
      {isLoading ? <Loader type="ScaleLoader" height={10} /> : 'Delete'}
    </Button>
  );

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>{button}</DialogFooter>
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>{button}</DrawerFooter>
    </DrawerContent>
  );
};

export default DeleteJob;
