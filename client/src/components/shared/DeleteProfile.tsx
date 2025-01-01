import React from 'react';

import { Trash } from 'lucide-react';

import { useDeleteProfile } from '@/hooks/mutations/useDeleteProfile.mutation';

import AlertDialogWrapper from '@/components/ui/info/alert-dialog-wrapper';
import { useAuth } from '@/hooks/core/useAuth.hook';

type DeleteProfileProps = {
  role: 'SEEKER' | 'EMPLOYER';
};

const DeleteProfile: React.FC<DeleteProfileProps> = ({ role }) => {
  const { mutateAsync: deleteProfileMutate } = useDeleteProfile(role);
  const { logout } = useAuth();

  const onDeleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteProfileMutate();
    logout();
  };

  return (
    <AlertDialogWrapper
      title="Delete Profile"
      description={`Deleting your account will remove all your information, including applications and jobs. ${role === 'SEEKER' ? 'Employers' : 'Seekers'} will no longer be able to contact you. Are you sure you want to proceed?`}
      onAction={onDeleteProfile}
      actionText="Delete"
      cancelText="Cancel"
      buttonTriggerProps={{ variant: 'destructive' }}
      triggerContent={
        <div className="flex gap-2 items-center">
          <span className="max-sm:hidden">Delete Profile</span> <Trash />
        </div>
      }
    />
  );
};

export default DeleteProfile;
