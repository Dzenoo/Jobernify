import React from 'react';

import dynamic from 'next/dynamic';

import { Application } from '@/types';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import LoadingApplicationsSkeleton from '@/components/loaders/seekers/LoadingApplications';
const ApplicationsList = dynamic(
  () => import('@/components/seekers/profile/applications/ApplicationsList'),
  {
    loading: () => <LoadingApplicationsSkeleton />,
  },
);

type ApplicationsProps = {
  applications: Application[];
};

const Applications: React.FC<ApplicationsProps> = ({ applications }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-base-black">
              Applications ({applications.length})
            </h1>
          </div>
          <div>
            <p className="text-initial-gray">
              View the status of your job applications below. Stay updated on
              your application progress
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ApplicationsList applications={applications} />
      </CardContent>
    </Card>
  );
};

export default Applications;
