import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { deleteJob } from '@/lib/actions/jobs.actions';
import { queryClient } from '@/context/react-query-client';

import Loader from '@/components/shared/ui/Loader';

import { useToast } from '@/components/ui/info/use-toast';
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
  const { toast } = useToast();
  const { mutateAsync: deleteJobMutate, status } = useMutation({
    mutationFn: () => {
      return deleteJob(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs', 'profile'] });
      toast({
        title: 'Job Deleted',
        description: 'The job has been successfully deleted.',
      });
      onClose();
    },
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });

  const isLoading = status === 'pending';

  const onDeleteJob = async () => {
    await deleteJobMutate();
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
