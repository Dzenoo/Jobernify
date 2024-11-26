import React from "react";

import { useMutation } from "react-query";

import { deleteEmployerProfile } from "@/lib/actions/employers.actions";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerHeader,
} from "@/components/ui/drawer";

type DeleteEmployerProfileProps = {
  token: string;
  closeDelete: () => void;
  isDialog: boolean;
};

const DeleteEmployerProfile: React.FC<DeleteEmployerProfileProps> = ({
  token,
  closeDelete,
  isDialog,
}) => {
  const { toast } = useToast();
  const { deleteCookieHandler } = useAuthentication();
  const { mutateAsync: deleteEmployerProfileMutate } = useMutation({
    mutationFn: () => deleteEmployerProfile({ token }),
    onSuccess: () => {},
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const onDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    await deleteEmployerProfileMutate();

    deleteCookieHandler();
    closeDelete();
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
                including applications and jobs. Seeker will no longer be able
                to view your profile. Are you sure you want to proceed?
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={onDeleteAccount}>
              Delete
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    );
  }

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-center">Delete Profile</DrawerTitle>
      </DrawerHeader>
      <div className="p-5 flex flex-col items-center justify-center gap-6">
        <div className="max-w-lg">
          <div className="flex items-center justify-center gap-3 flex-col">
            <p className="text-initial-gray text-center">
              Deleting your account will remove all your information, including
              applications and jobs. Seeker will no longer be able to vi you.
              Are you sure you want to proceed?
            </p>
          </div>
        </div>
      </div>
      <DrawerFooter>
        <Button variant="destructive" onClick={onDeleteAccount}>
          Delete
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default DeleteEmployerProfile;
