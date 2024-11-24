"use client";

import React from "react";
import UpdateJobForm from "@/components/employers/dashboard/jobs/new/UpdateJobForm";

import { useQuery } from "react-query";
import { getJobById } from "@/lib/actions/jobs.actions";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { JobTypes } from "@/types";
import NotFound from "@/components/shared/pages/NotFound";

const EditJobPage = ({ params }: { params: { jobId: string } }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJob, isLoading } = useQuery({
    queryFn: () => getJobById(params.jobId, token as string),
  });

  if (!isLoading && !fetchedJob) {
    return <NotFound href="/dashboard/jobs" />;
  }

  return (
    <section>
      <UpdateJobForm
        isEdit={true}
        jobId={params.jobId}
        formData={fetchedJob?.job as JobTypes}
      />
    </section>
  );
};

export default EditJobPage;
