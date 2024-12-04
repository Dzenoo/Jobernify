"use client";

import React from "react";
import UpdateJobForm from "@/components/employers/dashboard/jobs/new/forms/UpdateJobForm";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getJobById } from "@/lib/actions/jobs.actions";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import NotFound from "@/components/shared/pages/NotFound";

const EditJobPage = ({ params }: { params: { jobId: string } }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJob, isLoading } = useSuspenseQuery({
    queryFn: () => getJobById(params.jobId, token as string),
    queryKey: ["jobs"],
  });

  if (!isLoading && !fetchedJob) {
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
