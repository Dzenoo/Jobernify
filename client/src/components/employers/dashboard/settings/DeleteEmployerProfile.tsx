import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { deleteEmployerProfile } from '@/lib/actions/employers.actions';

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
  DrawerFooter,
  DrawerTitle,
  DrawerHeader,
  DrawerDescription,
} from '@/components/ui/drawer';

type DeleteEmployerProfileProps = {
  closeDelete: () => void;
  isDialog: boolean;
};

const DeleteEmployerProfile: React.FC<DeleteEmployerProfileProps> = ({
  closeDelete,
  isDialog,
}) => {
  const { toast } = useToast();
  const { getCookieHandler, deleteCookieHandler } = useAuthentication();
  const { token } = getCookieHandler();
  const { mutateAsync: deleteEmployerProfileMutate } = useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return deleteEmployerProfile({ token });
    },
    onSuccess: () => {},
    onError: (error: any) => {
      toast({ title: 'Error', description: error?.response?.data?.message });
    },
  });

  const onDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    await deleteEmployerProfileMutate();
    deleteCookieHandler();
    closeDelete();
  };

  const title = 'Delete Profile';
  const description =
    'Deleting your account will remove all your information, including applications and jobs. Employer will no longer be able to view you. Are you sure you want to proceed?';

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {description}
          </DialogDescription>
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
        <DrawerDescription className="text-muted-foreground">
          {description}
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button variant="destructive" onClick={onDeleteAccount}>
          Delete
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default DeleteEmployerProfile;
