import React from 'react';

import dynamic from 'next/dynamic';

import LoadingJobsSkeleton from '@/components/loaders/seekers/LoadingJobsSkeleton';

import { Job } from '@/types';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-base-black">Saved Jobs ({savedJobs.length})</h1>
          </div>
          <div>
            <p className="text-muted-foreground text-base">
              Here are your saved jobs. You can remove them easily.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <JobsList jobs={savedJobs} message="You have no saved jobs." />
      </CardContent>
    </Card>
  );
};

export default SavedJobs;
