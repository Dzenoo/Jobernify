'use client';

import React, { useState } from 'react';

import { useGetSeeker } from '@/hooks/queries/useGetSeeker.query';
import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import LoadingSeekerProfileSkeleton from '@/components/templates/seekers/LoadingSeekerProfile';

import SeekerProfileNavigation from '@/components/seekers/profile/navigation/SeekerProfileNavigation';
import SeekerProfile from '@/components/seekers/profile/SeekerProfile';
import SeekerAlerts from '@/components/seekers/profile/alerts/SeekerAlerts';
import SavedJobs from '@/components/seekers/profile/savedJobs/SavedJobs';
import Applications from '@/components/seekers/profile/applications/Applications';
import PaginatedList from '@/components/ui/pagination/paginate-list';
import NotFound from '@/components/shared/pages/NotFound';
import SeekerSettings from '@/components/seekers/profile/settings/SeekerSettings';

const SeekerProfilePage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { updateSearchParams } = useSearchParams();
  const {
    data: fetchedSeeker,
    isLoading,
    isFetching,
    isRefetching,
  } = useGetSeeker(Number(searchParams.page || 1));

  const isLoadingSeeker = isLoading || isFetching || isRefetching;

  if (typeof window === 'undefined' || isLoadingSeeker) {
    return <LoadingSeekerProfileSkeleton />;
  }

  if (!fetchedSeeker) {
    return <NotFound />;
  }

  const isValidTab = currentTab >= 0 && currentTab <= 4;
  if (!isValidTab) {
    return <NotFound href="/jobs" />;
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
          onSearchParamsChange={updateSearchParams}
          currentTab={currentTab}
          updateTab={updateTab}
        />
      </div>

      {currentTab === 0 && (
        <div>
          <SeekerProfile seeker={fetchedSeeker.seeker} />
        </div>
      )}

      {currentTab === 1 && (
        <div>
          <SeekerAlerts
            alertsData={{
              alerts: fetchedSeeker.seeker.alerts,
              receiveJobAlerts: fetchedSeeker.seeker.receiveJobAlerts,
            }}
          />
        </div>
      )}

      {currentTab === 2 && (
        <div className="flex flex-col gap-5">
          <div>
            <SavedJobs savedJobs={fetchedSeeker.seeker.savedJobs} />
          </div>

          {fetchedSeeker.totalSavedJobs > 10 && (
            <div>
              <PaginatedList
                onPageChange={(value) =>
                  updateSearchParams('page', value.toString())
                }
                totalItems={fetchedSeeker.totalSavedJobs}
                itemsPerPage={10}
                currentPage={Number(searchParams.page) || 1}
              />
            </div>
          )}
        </div>
      )}

      {currentTab === 3 && (
        <div className="flex flex-col gap-5">
          <div>
            <Applications applications={fetchedSeeker.seeker.applications} />
          </div>

          {fetchedSeeker.totalApplications > 10 && (
            <div>
              <PaginatedList
                onPageChange={(value) =>
                  updateSearchParams('page', value.toString())
                }
                totalItems={fetchedSeeker.totalApplications}
                itemsPerPage={10}
                currentPage={Number(searchParams.page) || 1}
              />
            </div>
          )}
        </div>
      )}

      {currentTab === 4 && (
        <div>
          <SeekerSettings
            isTwoFactorAuthEnabled={fetchedSeeker.seeker.isTwoFactorAuthEnabled}
            receiveJobAlerts={fetchedSeeker.seeker.receiveJobAlerts}
          />
        </div>
      )}
    </section>
  );
};

export default SeekerProfilePage;
