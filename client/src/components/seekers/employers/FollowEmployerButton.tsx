import React from 'react';

import { Button } from '@/components/ui/buttons/button';

import {
  SeekerMutationType,
  useSeekerMutation,
} from '@/hooks/mutations/useSeeker.mutation';
import {
  SeekerQueryType,
  useSeekerQuery,
} from '@/hooks/queries/useSeeker.query';

type FollowEmployerProps = {
  employerId: string;
};

const FollowEmployerButton: React.FC<FollowEmployerProps> = ({
  employerId,
}) => {
  const { data: fetchedSeekerProfile, refetch } = useSeekerQuery({
    type: SeekerQueryType.GET_SEEKER_PROFILE,
    params: { query: {} },
  });
  const mutation = useSeekerMutation();

  const isLoading = mutation.status === 'pending';

  const isEmployerFollowed =
    fetchedSeekerProfile?.seeker?.following.includes(employerId);

  const handleFollowToggle = () => {
    mutation.mutateAsync({
      type: SeekerMutationType.FOLLOW_EMPLOYER,
      employerId,
    });
    refetch();
  };

  return (
    <div>
      <Button
        variant={isEmployerFollowed ? 'outline' : 'default'}
        className="max-lg:w-full px-10"
        onClick={handleFollowToggle}
        disabled={isLoading}
      >
        {isEmployerFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
};

export default FollowEmployerButton;
