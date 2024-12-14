import React from "react";

import dynamic from "next/dynamic";

import LoadingJobsSkeleton from "@/components/loaders/seekers/LoadingJobsSkeleton";

import { JobTypes } from "@/types";

const JobsList = dynamic(() => import("@/components/seekers/jobs/JobsList"), {
  loading: () => <LoadingJobsSkeleton />,
});

type SavedJobsProps = {
  savedJobs: JobTypes[];
};

const SavedJobs: React.FC<SavedJobsProps> = ({ savedJobs }) => {
  return (
    <div className="pt-5 flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-base-black">Saved Jobs ({savedJobs.length})</h1>
        </div>
        <div>
          <p className="text-initial-gray">
            Here are your saved jobs. You can remove them easily.
          </p>
        </div>
      </div>
      <div>
        <JobsList jobs={savedJobs} message="You have no saved jobs." />
      </div>
    </div>
  );
};

export default SavedJobs;
