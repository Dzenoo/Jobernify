"use client";

import React from "react";

import useGetSeeker from "@/hooks/queries/useGetSeeker.query";

import LoadingSeekerProfileSkeleton from "@/components/loaders/seekers/LoadingSeekerProfile";

import SeekerProfileNavigation from "@/components/seekers/profile/navigation/SeekerProfileNavigation";
import SeekerProfile from "@/components/seekers/profile/SeekerProfile";
import SeekerAlerts from "@/components/seekers/profile/alerts/SeekerAlerts";
import JobsList from "@/components/seekers/jobs/JobsList";
import Applications from "@/components/seekers/profile/applications/Applications";
import NotFound from "@/components/shared/pages/NotFound";

const SeekerProfilePage = ({
  searchParams,
}: {
  searchParams: { section: string };
}) => {
  const { data, isLoading, isFetching, isRefetching } = useGetSeeker();

  const isLoadingSeeker = isLoading || isFetching || isRefetching;

  if (isLoadingSeeker) {
    return <LoadingSeekerProfileSkeleton />;
  } else if (!data) {
    return <NotFound />;
  }

  if (
    searchParams.section &&
    searchParams.section !== "saved" &&
    searchParams.section !== "alerts" &&
    searchParams.section !== "applications"
  ) {
    return <NotFound />;
  }

  return (
    <section className="flex justify-between gap-[10px] flex-col mx-40 max-xl:mx-0">
      <div>
        <SeekerProfileNavigation section={searchParams.section} />
      </div>
      {!searchParams.section && (
        <div>
          <SeekerProfile seeker={data.seeker} />
        </div>
      )}
      {searchParams.section === "saved" && (
        <div>
          <JobsList
            jobs={data.seeker.savedJobs}
            message="You have no saved jobs."
          />
        </div>
      )}
      {searchParams.section === "alerts" && (
        <div>
          <SeekerAlerts
            alertsData={{
              alerts: data.seeker.alerts,
              receiveJobAlerts: data.seeker.receiveJobAlerts,
            }}
          />
        </div>
      )}
      {searchParams.section === "applications" && (
        <div>
          <Applications applications={data.seeker.applications} />
        </div>
      )}
    </section>
  );
};

export default SeekerProfilePage;
