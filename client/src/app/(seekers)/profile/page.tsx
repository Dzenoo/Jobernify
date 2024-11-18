"use client";

import React from "react";
import dynamic from "next/dynamic";

import useAuthentication from "@/hooks/defaults/useAuthentication";
import useGetSeeker from "@/hooks/queries/useGetSeeker";

import LoadingApplicationsSkeleton from "@/components/loaders/LoadingApplications";
import LoadingJobsSkeleton from "@/components/loaders/LoadingJobsSkeleton";
import LoadingSeekersInformationsSkeleton from "@/components/loaders/LoadingSeekersInformations";

import SeekerProfileAlerts from "@/components/seekers/profile/alerts/NewAlertsForm";
import SeekerProfileNavigation from "@/components/seekers/profile/navigation/SeekerProfileNavigation";
import NotFound from "@/components/shared/pages/NotFound";

const JobsList = dynamic(() => import("@/components/seekers/jobs/JobsList"), {
  loading: () => <LoadingJobsSkeleton />,
});

const Applications = dynamic(
  () => import("@/components/seekers/profile/applications/Applications"),
  {
    loading: () => <LoadingApplicationsSkeleton />,
  }
);

const SeekerProfileInformation = dynamic(
  () => import("@/components/seekers/profile/SeekerProfileInformation"),
  {
    loading: () => <LoadingSeekersInformationsSkeleton />,
  }
);

const SeekerProfilePage = ({
  searchParams,
}: {
  searchParams: { section: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedSeekerProfile } = useGetSeeker();

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
          <SeekerProfileInformation
            seeker={fetchedSeekerProfile?.seeker}
            token={token!}
          />
        </div>
      )}
      {searchParams.section === "saved" && (
        <div>
          <JobsList
            jobs={fetchedSeekerProfile?.seeker.savedJobs || []}
            message="You have no saved jobs."
          />
        </div>
      )}
      {searchParams.section === "alerts" && (
        <div>
          <SeekerProfileAlerts alerts={fetchedSeekerProfile?.seeker.alerts} />
        </div>
      )}
      {searchParams.section === "applications" && (
        <div>
          <Applications
            applications={fetchedSeekerProfile?.seeker.applications || []}
          />
        </div>
      )}
    </section>
  );
};

export default SeekerProfilePage;
