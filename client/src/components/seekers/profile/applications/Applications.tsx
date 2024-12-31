import React from 'react';

import dynamic from 'next/dynamic';

import { Application } from '@/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';
import { Separator } from '@/components/ui/layout/separator';

import LoadingApplicationsSkeleton from '@/components/templates/seekers/LoadingApplications';
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
        <CardTitle>Applications ({applications.length})</CardTitle>
        <CardDescription>
          View the status of your job applications below. Stay updated on your
          application progress
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ApplicationsList applications={applications} />
      </CardContent>
    </Card>
  );
};

export default Applications;
