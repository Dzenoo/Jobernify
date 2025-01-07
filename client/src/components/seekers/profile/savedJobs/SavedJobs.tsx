import React from 'react';

import dynamic from 'next/dynamic';

import LoadingJobsSkeleton from '@/components/templates/seekers/LoadingJobsSkeleton';

import { Job } from '@/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';
import { Separator } from '@/components/ui/layout/separator';

const JobsList = dynamic(() => import('@/components/seekers/jobs/JobsList'), {
  loading: () => <LoadingJobsSkeleton />,
});

type SavedJobsProps = {
  savedJobs: Job[];
};

const SavedJobs: React.FC<SavedJobsProps> = ({ savedJobs }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Jobs ({savedJobs.length})</CardTitle>
        <CardDescription>
          Here are your saved jobs. You can remove them easily.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <JobsList jobs={savedJobs} message="You have no saved jobs." />
      </CardContent>
    </Card>
  );
};

export default SavedJobs;
