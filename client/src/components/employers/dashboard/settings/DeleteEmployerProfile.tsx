import React from 'react';

import { Trash } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { deleteEmployerProfile } from '@/lib/actions/employers.actions';
import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { useToast } from '@/components/ui/info/use-toast';
import AlertDialogWrapper from '@/components/ui/info/alert-dialog-wrapper';

type DeleteEmployerProfileProps = {};

const DeleteEmployerProfile: React.FC<DeleteEmployerProfileProps> = ({}) => {
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
  };

  return (
    <AlertDialogWrapper
      title="Delete Profile"
      description="Deleting your account will remove all your information, including applications and jobs. Employer will no longer be able to view you. Are you sure you want to proceed?"
      onAction={onDeleteAccount}
      actionText="Delete"
      cancelText="Cancel"
      buttonTriggerProps={{ variant: 'destructive' }}
      triggerContent={
        <div className="flex items-center gap-2">
          <span className="max-sm:hidden">Delete Profile</span> <Trash />
        </div>
      }
    />
  );
};

export default DeleteEmployerProfile;
