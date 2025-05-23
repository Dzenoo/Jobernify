'use client';

import { useState } from 'react';

import { JobQueryType, useJobQuery } from '@/hooks/queries/useJob.query';
import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';

import LoadingJobDetails from '@/components/templates/seekers/LoadingJobDetails';

import AddJobAlert from '@/components/seekers/jobs/details/AddJobAlert';
import JobDetailsInfo from '@/components/seekers/jobs/details/JobDetailsInfo';
import SeekerInfo from '@/components/seekers/jobs/SeekerInfo';
import JobsList from '@/components/seekers/jobs/JobsList';
import ApplyToJobForm from '@/components/seekers/jobs/details/forms/ApplyToJobForm';
import NotFound from '@/components/shared/pages/NotFound';

const JobDetailsPage = ({
  params: { jobId },
}: {
  params: { jobId: string };
}) => {
  const [isApplyToJob, setIsApplyToJob] = useState(false);

  const isSmall = useMediaQuery('(min-width: 650px)');

  const { data: fetchedJobs, isLoading } = useJobQuery({
    type: JobQueryType.GET_JOB_BY_ID,
    params: { jobId },
  });

  if (isLoading) {
    return <LoadingJobDetails />;
  }

  if (!fetchedJobs) {
    return <NotFound />;
  }

  return (
    <section className="flex gap-5 justify-between max-xl:flex-col">
      <div className="max-xl:basis-full basis-2/5">
        <SeekerInfo />
      </div>

      <div className="basis-full grow">
        <JobDetailsInfo
          job={fetchedJobs.job}
          onApplyJob={() => setIsApplyToJob(true)}
        />
      </div>

      <div className="basis-2/5">
        <AddJobAlert
          level={fetchedJobs.job.level}
          type={fetchedJobs.job.type}
          title={fetchedJobs.job.title}
        />
        {fetchedJobs.jobs.length > 0 && (
          <JobsList
            jobs={fetchedJobs.jobs}
            message="No similar jobs found at the moment."
          />
        )}
      </div>

      <ApplyToJobForm
        isApplyToJob={isApplyToJob}
        setIsApplyToJob={setIsApplyToJob}
        jobId={jobId}
        isDialog={isSmall ? true : false}
      />
    </section>
  );
};

export default JobDetailsPage;
