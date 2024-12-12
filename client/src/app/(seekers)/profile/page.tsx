"use client";

import React, { useState } from "react";

import useGetSeeker from "@/hooks/queries/useGetSeeker.query";

import LoadingSeekerProfileSkeleton from "@/components/loaders/seekers/LoadingSeekerProfile";

import SeekerProfileNavigation from "@/components/seekers/profile/navigation/SeekerProfileNavigation";
import SeekerProfile from "@/components/seekers/profile/SeekerProfile";
import SeekerAlerts from "@/components/seekers/profile/alerts/SeekerAlerts";
import JobsList from "@/components/seekers/jobs/JobsList";
import Applications from "@/components/seekers/profile/applications/Applications";
import NotFound from "@/components/shared/pages/NotFound";

const SeekerProfilePage = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { data, isLoading, isFetching, isRefetching } = useGetSeeker();

  const isLoadingSeeker = isLoading || isFetching || isRefetching;

  if (typeof window === "undefined" || isLoadingSeeker) {
    return <LoadingSeekerProfileSkeleton />;
  }

  if (!data) {
    return <NotFound />;
  }

  const isValidTab = currentTab >= 0 && currentTab <= 3;
  if (!isValidTab) {
    return <NotFound />;
  }

  const updateTab = (tab: number) => {
    if (currentTab !== tab) {
      setCurrentTab(tab);
    }
  };

  return (
    <section className="flex justify-between gap-[10px] flex-col mx-40 max-xl:mx-0">
      <div>
        <SeekerProfileNavigation
          currentTab={currentTab}
          updateTab={updateTab}
        />
      </div>
      {currentTab === 0 && (
        <div>
          <SeekerProfile seeker={data.seeker} />
        </div>
      )}
      {currentTab === 1 && (
        <div>
          <JobsList
            jobs={data.seeker.savedJobs}
            message="You have no saved jobs."
          />
        </div>
      )}
      {currentTab === 2 && (
        <div>
          <SeekerAlerts
            alertsData={{
              alerts: data.seeker.alerts,
              receiveJobAlerts: data.seeker.receiveJobAlerts,
            }}
          />
        </div>
      )}
      {currentTab === 3 && (
        <div>
          <Applications applications={data.seeker.applications} />
        </div>
      )}
    </section>
  );
};

export default SeekerProfilePage;
