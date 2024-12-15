import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { deleteSeekerProfile } from '@/lib/actions/seekers.actions';

import useAuthentication from '@/hooks/defaults/useAuthentication.hook';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DrawerContent,
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

  if (isDialog) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="max-w-lg">
            <div className="flex items-center justify-center gap-3 flex-col">
              <p className="text-initial-gray text-center">
                Deleting your account will remove all your information,
                including applications and jobs. Employers will no longer be
                able to contact you. Are you sure you want to proceed?
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full"
              variant="destructive"
              onClick={onDeleteAccount}
            >
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    );
  }

  return (
    <DrawerContent className="flex-col items-center justify-center">
      <DrawerHeader className="text-center">
        <DrawerTitle>Delete Profile</DrawerTitle>
      </DrawerHeader>
      <div className="p-5 flex flex-col gap-6">
        <div className="max-w-lg">
          <div className="flex items-center justify-center gap-3 flex-col">
            <p className="text-initial-gray text-center">
              Deleting your account will remove all your information, including
              applications and jobs. Employers will no longer be able to contact
              you. Are you sure you want to proceed?
            </p>
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <Button variant="destructive" onClick={onDeleteAccount}>
            Delete
          </Button>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
};

export default DeleteSeekerProfile;
