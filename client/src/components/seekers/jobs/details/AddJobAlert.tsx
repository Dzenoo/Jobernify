import React from 'react';

import Loader from '@/components/shared/ui/Loader';

import {
  SeekerMutationType,
  useSeekerMutation,
} from '@/hooks/mutations/useSeeker.mutation';
import {
  SeekerQueryType,
  useSeekerQuery,
} from '@/hooks/queries/useSeeker.query';

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
    const mutation = useSeekerMutation();
    const { data } = useSeekerQuery({
      type: SeekerQueryType.GET_SEEKER_PROFILE,
      params: { query: {} },
    });

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

    const isLoading = mutation.status === 'pending';

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
            onClick={() => {
              const formData = new FormData();
              formData.append('title', title || '');
              formData.append('type', type || '');
              formData.append('level', level || '');

              return mutation.mutateAsync({
                type: SeekerMutationType.GENERATE_JOB_ALERT,
                data: formData,
              });
            }}
            disabled={isLoading || isAlreadyAlertGeneratedWithProperties}
          >
            {isLoading ? (
              <Loader type="ScaleLoader" height={10} />
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
