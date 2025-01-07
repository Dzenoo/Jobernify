import React from 'react';

import { Search } from 'lucide-react';

import JobItem from './JobItem';

import { Job } from '@/types';

type JobListProps = {
  jobs: Job[];
  message?: string;
};

const JobsList: React.FC<JobListProps> = React.memo(
  ({
    jobs,
    message = 'It seems there are no jobs available at the moment.',
  }) => {
    return (
      <div>
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div>
              <Search size={50} className="mb-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold ">No Jobs Found</h2>
            </div>
            <div>
              <p className="text-muted-foreground dark:text-muted-foreground text-center">
                {message}
              </p>
            </div>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {jobs.map((job) => (
              <JobItem key={job._id} job={job} />
            ))}
          </ul>
        )}
      </div>
    );
  },
);

export default JobsList;
