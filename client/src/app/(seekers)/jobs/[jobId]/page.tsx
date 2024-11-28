"use client";

import { useState } from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { getJobById } from "@/lib/actions/jobs.actions";

import LoadingJobDetails from "@/components/loaders/seekers/LoadingJobDetails";
import AddJobAlert from "@/components/seekers/jobs/details/AddJobAlert";
import JobDetailsInfo from "@/components/seekers/jobs/details/JobDetailsInfo";
import JobsList from "@/components/seekers/jobs/JobsList";
import ApplyToJobForm from "@/components/seekers/jobs/details/forms/ApplyToJobForm";
import NotFound from "@/components/shared/pages/NotFound";
import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import SeekerInfo from "@/components/seekers/jobs/SeekerInfo";

const JobDetailsPage = ({
  params: { jobId },
}: {
  params: { jobId: string };
}) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [isApplyToJob, setIsApplyToJob] = useState(false);
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedJobs, isLoading } = useQuery({
    queryFn: () => getJobById(jobId, token as string),
    queryKey: ["job", { jobId }],
  });

  if (isLoading) {
    return <LoadingJobDetails />;
  }

  if (!isLoading && !fetchedJobs) {
    return <NotFound />;
  }

  return (
    <section className="flex gap-5 justify-between max-xl:flex-col">
      <div className="max-xl:basis-full basis-[38em]">
        <AddJobAlert
          level={fetchedJobs?.job.level || ""}
          type={fetchedJobs?.job.type || ""}
          title={fetchedJobs?.job.title || ""}
        />
      </div>
      <div className="basis-full grow">
        <JobDetailsInfo
          job={fetchedJobs?.job}
          onApplyJob={() => setIsApplyToJob(true)}
        />
      </div>
      <div className="basis-1/2">
        <div>
          <SeekerInfo />
        </div>
        <div>
          <JobsList jobs={fetchedJobs?.jobs} />
        </div>
      </div>
      <ApplyToJobForm
        isApplyToJob={isApplyToJob}
        setIsApplyToJob={setIsApplyToJob}
        token={token as string}
        jobId={jobId}
        isDialog={isLarge ? true : false}
      />
    </section>
  );
};

export default JobDetailsPage;
