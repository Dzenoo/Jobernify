import React from "react";

import { Button } from "@/components/ui/button";

import useFollowEmployer from "@/hooks/mutations/useFollowEmployer.mutation";
import useGetSeeker from "@/hooks/queries/useGetSeeker.query";

type FollowEmployerProps = {
  employerId: string;
};

const FollowEmployerButton: React.FC<FollowEmployerProps> = ({
  employerId,
}) => {
  const { data: fetchedSeekerProfile, refetch } = useGetSeeker();
  const { mutateAsync: followEmployerMutate, isLoading } =
    useFollowEmployer(employerId);

  const isEmployerFollowed =
    fetchedSeekerProfile?.seeker?.following.includes(employerId);

  const handleFollowToggle = async () => {
    await followEmployerMutate();
    refetch();
  };

  return (
    <div>
      <Button
        variant={isEmployerFollowed ? "outline" : "default"}
        className="max-sm:w-full px-10"
        onClick={handleFollowToggle}
        disabled={isLoading}
      >
        {isEmployerFollowed ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default FollowEmployerButton;
