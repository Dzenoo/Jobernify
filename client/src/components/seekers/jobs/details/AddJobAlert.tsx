import React from "react";

import { ScaleLoader } from "react-spinners";

import useJobAlert from "@/hooks/mutations/useJobAlert.mutation";
import useGetSeeker from "@/hooks/queries/useGetSeeker.query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type JobAlertProps = {
  level: string;
  type: string;
  title: string;
};

const AddJobAlert: React.FC<JobAlertProps> = ({ level, type, title }) => {
  const jobAlertData = {
    level,
    type,
    title,
  };
  const { mutateAsync: addJobAlertMutate, isLoading } = useJobAlert();
  const { data: fetchedSeekerProfile } = useGetSeeker();
  const seekerData = fetchedSeekerProfile?.seeker;

  const isAlreadyAlertGeneratedWithProperties =
    seekerData?.alerts.level === level &&
    seekerData?.alerts.type === type &&
    seekerData?.alerts.title === title;

  return (
    <Card>
      <CardHeader>
        <h1 className="text-base-black">Generate Job Alert</h1>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-initial-gray">
          Get notified when job like this show. Set up alerts now and never miss
          a matching opportunity.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full"
          onClick={() => addJobAlertMutate(jobAlertData)}
          disabled={isLoading || isAlreadyAlertGeneratedWithProperties}
        >
          {isLoading ? (
            <ScaleLoader color="#fff" height={10} />
          ) : isAlreadyAlertGeneratedWithProperties ? (
            "Already Generated"
          ) : (
            "Add Job Alert"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddJobAlert;
