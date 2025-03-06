'use client';

import React from 'react';

import { JobQueryType, useJobQuery } from '@/hooks/queries/useJob.query';

import UpdateJobForm from '@/components/employers/dashboard/jobs/new/forms/UpdateJobForm';
import NotFound from '@/components/shared/pages/NotFound';
import LoadingUpdateJob from '@/components/templates/employers/LoadingUpdateJob';

const EditJobPage = ({ params }: { params: { jobId: string } }) => {
  const { data: fetchedJob, isLoading } = useJobQuery({
    type: JobQueryType.GET_JOB_BY_ID,
    params: { jobId: params.jobId },
  });

  if (isLoading) {
    return <LoadingUpdateJob />;
  }

  if (!fetchedJob) {
    return <NotFound href="/dashboard/jobs" />;
  }

  return (
    <section>
      <UpdateJobForm
        isEdit={true}
        jobId={params.jobId}
        formData={fetchedJob.job}
      />
    </section>
  );
};

export default EditJobPage;
