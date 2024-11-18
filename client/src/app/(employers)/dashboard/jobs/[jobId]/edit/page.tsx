"use client";

import React from "react";
import UpdateJobForm from "@/components/employers/dashboard/jobs/new/UpdateJobForm";

import { useQuery } from "react-query";
import { getJob } from "@/lib/actions/employers.actions";

import useAuthentication from "@/hooks/defaults/useAuthentication";
import { JobTypes } from "@/types";
import NotFound from "@/components/shared/pages/NotFound";

const EditJobPage = ({ params }: { params: { jobId: string } }) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJob, isLoading } = useQuery({
    queryFn: () => getJob(token as string, params.jobId),
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
