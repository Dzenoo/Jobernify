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
  const { mutateAsync: addJobAlertMutate, status } = useJobAlert();
  const { data } = useGetSeeker();

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <h1 className="text-base-black">Generate Job Alert</h1>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-initial-gray">Loading seeker data...</p>
        </CardContent>
        <CardFooter>
          <Button variant="default" className="w-full" disabled>
            Loading...
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const { alerts } = data.seeker;

  const isLoading = status === "pending";

  const isAlreadyAlertGeneratedWithProperties =
    alerts &&
    alerts.level === level &&
    alerts.type === type &&
    alerts.title === title;

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
          onClick={() => addJobAlertMutate({ level, type, title })}
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
