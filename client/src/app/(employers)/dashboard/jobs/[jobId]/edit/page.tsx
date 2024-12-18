'use client';

import React from 'react';
import UpdateJobForm from '@/components/employers/dashboard/jobs/new/forms/UpdateJobForm';

import { useQuery } from '@tanstack/react-query';
import { getJobById } from '@/lib/actions/jobs.actions';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';
import NotFound from '@/components/shared/pages/NotFound';
import LoadingUpdateJob from '@/components/loaders/employers/LoadingUpdateJob';

const EditJobPage = ({ params }: { params: { jobId: string } }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJob, isLoading } = useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getJobById(params.jobId, token);
    },
    queryKey: ['jobs'],
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
