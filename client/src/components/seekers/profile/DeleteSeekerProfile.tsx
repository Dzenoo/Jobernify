import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { deleteSeekerProfile } from '@/lib/actions/seekers.actions';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

type DeleteSeekerProfileProps = {
  closeDialog: () => void;
  isDialog: boolean;
};

const DeleteSeekerProfile: React.FC<DeleteSeekerProfileProps> = ({
  closeDialog,
  isDialog,
}) => {
  const { toast } = useToast();
  const { deleteCookieHandler } = useAuthentication();
  const { token } = useAuthentication().getCookieHandler();
  const { mutateAsync: deleteSeekerProfileMutate } = useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return deleteSeekerProfile(token);
    },
    onSuccess: () => {},
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });

  const onDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteSeekerProfileMutate();
    deleteCookieHandler();
    closeDialog();
  };

  const title = 'Delete Profile';
  const description =
    'Deleting your account will remove all your information, including applications and jobs. Employers will no longer be able to contact you. Are you sure you want to proceed?';

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full"
            variant="destructive"
            onClick={onDeleteAccount}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter className="pt-2">
        <Button variant="destructive" onClick={onDeleteAccount}>
          Delete
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default DeleteSeekerProfile;
