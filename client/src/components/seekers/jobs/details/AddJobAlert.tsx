import React from 'react';

import { ScaleLoader } from 'react-spinners';

import { useJobAlert } from '@/hooks/mutations/useJobAlert.mutation';
import { useGetSeeker } from '@/hooks/queries/useGetSeeker.query';

import { Button } from '@/components/ui/buttons/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';

type JobAlertProps = {
  level: string;
  type: string;
  title: string;
};

const AddJobAlert: React.FC<JobAlertProps> = React.memo(
  ({ level, type, title }) => {
    const { mutateAsync: addJobAlertMutate, status } = useJobAlert();
    const { data } = useGetSeeker();

    if (!data) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Generate Job Alert</CardTitle>
            <CardDescription className="pt-2">
              Loading seeker data...
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="default" className="w-full" disabled>
              Loading...
            </Button>
          </CardFooter>
        </Card>
      );
    }

    const { alerts } = data.seeker;

    const isLoading = status === 'pending';

    const isAlreadyAlertGeneratedWithProperties =
      alerts &&
      alerts.level === level &&
      alerts.type === type &&
      alerts.title === title;

    return (
      <Card>
        <CardHeader>
          <CardTitle>Generate Job Alert</CardTitle>
          <CardDescription className="text-base pt-2">
            Get notified when job like this show. Set up alerts now and never
            miss a matching opportunity.
          </CardDescription>
        </CardHeader>
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
              'Already Generated'
            ) : (
              'Add Job Alert'
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  },
);

export default AddJobAlert;
