import React from 'react';

import dynamic from 'next/dynamic';

import LoadingJobsSkeleton from '@/components/loaders/seekers/LoadingJobsSkeleton';

import { Job } from '@/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      <CardContent className="pt-0">
        <JobsList jobs={savedJobs} message="You have no saved jobs." />
      </CardContent>
    </Card>
  );
};

export default SavedJobs;
