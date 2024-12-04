"use client";

import React from "react";
import dynamic from "next/dynamic";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import useGetSeeker from "@/hooks/queries/useGetSeeker.query";

import LoadingApplicationsSkeleton from "@/components/loaders/seekers/LoadingApplications";
import LoadingJobsSkeleton from "@/components/loaders/seekers/LoadingJobsSkeleton";
import LoadingSeekerProfileSkeleton from "@/components/loaders/seekers/LoadingSeekerProfile";

import SeekerAlerts from "@/components/seekers/profile/alerts/SeekerAlerts";
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

const SeekerProfile = dynamic(
  () => import("@/components/seekers/profile/SeekerProfile"),
  {
    loading: () => <LoadingSeekerProfileSkeleton />,
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
          <SeekerProfile
            seeker={fetchedSeekerProfile.seeker}
            token={token as string}
          />
        </div>
      )}
      {searchParams.section === "saved" && (
        <div>
          <JobsList
            jobs={fetchedSeekerProfile.seeker.savedJobs}
            message="You have no saved jobs."
          />
        </div>
      )}
      {searchParams.section === "alerts" && (
        <div>
          <SeekerAlerts
            token={token as string}
            alertsData={{
              alerts: fetchedSeekerProfile.seeker.alerts,
              receiveJobAlerts: fetchedSeekerProfile.seeker.receiveJobAlerts,
            }}
          />
        </div>
      )}
      {searchParams.section === "applications" && (
        <div>
          <Applications
            applications={fetchedSeekerProfile.seeker.applications}
          />
        </div>
      )}
    </section>
  );
};

export default SeekerProfilePage;
