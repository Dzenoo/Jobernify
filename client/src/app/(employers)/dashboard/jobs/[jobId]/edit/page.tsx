'use client';

import React from 'react';

import { useGetJobById } from '@/hooks/queries/useGetJobById.query';

import UpdateJobForm from '@/components/employers/dashboard/jobs/new/forms/UpdateJobForm';
import NotFound from '@/components/shared/pages/NotFound';
import LoadingUpdateJob from '@/components/loaders/employers/LoadingUpdateJob';

const EditJobPage = ({ params }: { params: { jobId: string } }) => {
  const { data: fetchedJob, isLoading } = useGetJobById(params.jobId);

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
