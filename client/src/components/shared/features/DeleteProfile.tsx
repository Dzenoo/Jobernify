import React from 'react';

import { Trash } from 'lucide-react';

import {
  SeekerMutationType,
  useSeekerMutation,
} from '@/hooks/mutations/useSeeker.mutation';
import {
  EmployerMutationType,
  useEmployerMutation,
} from '@/hooks/mutations/useEmployer.mutation';
import { useAuth } from '@/hooks/core/useAuth.hook';

import AlertDialogWrapper from '@/components/ui/info/alert-dialog-wrapper';

type DeleteProfileProps = {
  role: 'SEEKER' | 'EMPLOYER';
};

const DeleteProfile: React.FC<DeleteProfileProps> = ({ role }) => {
  const seekerMutation = useSeekerMutation();
  const employerMutation = useEmployerMutation();
  const { logout } = useAuth();

  const onDeleteProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (role === 'EMPLOYER') {
      employerMutation.mutateAsync({
        type: EmployerMutationType.DELETE_PROFILE,
      });
    } else {
      seekerMutation.mutateAsync({
        type: SeekerMutationType.DELETE_PROFILE,
      });
    }

    logout();
  };

  return (
    <AlertDialogWrapper
      title="Delete Profile"
      description={`Deleting your account will remove all your information, including applications and jobs. ${
        role === 'SEEKER' ? 'Employers' : 'Seekers'
      } will no longer be able to contact you. Are you sure you want to proceed?`}
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
