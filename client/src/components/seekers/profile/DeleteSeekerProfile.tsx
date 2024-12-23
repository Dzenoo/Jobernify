import React from 'react';

import { Trash } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { deleteSeekerProfile } from '@/lib/actions/seekers.actions';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { useToast } from '@/components/ui/info/use-toast';
import AlertDialogWrapper from '@/components/ui/info/alert-dialog-wrapper';

type DeleteSeekerProfileProps = {};

const DeleteSeekerProfile: React.FC<DeleteSeekerProfileProps> = ({}) => {
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
  };

  return (
    <AlertDialogWrapper
      title="Delete Profile"
      description="Deleting your account will remove all your information, including applications and jobs. Employers will no longer be able to contact you. Are you sure you want to proceed?"
      onAction={onDeleteAccount}
      actionText="Delete"
      cancelText="Cancel"
      buttonTriggerProps={{ variant: 'destructive' }}
      triggerContent={
        <div className="flex gap-2 items-center">
          Delete Profile <Trash />
        </div>
      }
    />
  );
};

export default DeleteSeekerProfile;
