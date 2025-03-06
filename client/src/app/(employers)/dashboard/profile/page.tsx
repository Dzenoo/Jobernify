'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import {
  EmployerQueryType,
  useEmployerQuery,
} from '@/hooks/queries/useEmployer.query';
import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import LoadingEmployerProfile from '@/components/templates/employers/LoadingEmployerProfile';
import NotFound from '@/components/shared/pages/NotFound';
import EmployerSettings from '@/components/employers/dashboard/profile/settings/EmployerSettings';
import EmployerProfileNavigation from '@/components/employers/dashboard/profile/navigation/EmployerProfileNavigation';

const EmployerProfile = dynamic(
  () => import('@/components/employers/dashboard/profile/EmployerProfile'),
  {
    loading: () => <LoadingEmployerProfile />,
  },
);

const EmployerProfilePage = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const { updateSearchParams } = useSearchParams();
  const { data: fetchedEmployerProfile } = useEmployerQuery({
    type: EmployerQueryType.GET_EMPLOYER_PROFILE,
    params: { query: {} },
  });

  if (!fetchedEmployerProfile) {
    return (
      <div className="py-6 mx-40 max-xl:mx-0">
        <LoadingEmployerProfile />
      </div>
    );
  }

  const isValidTab = currentTab >= 0 && currentTab <= 1;
  if (!isValidTab) {
    return <NotFound href="/jobs" />;
  }

  const updateTab = (tab: number) => {
    if (currentTab !== tab) {
      setCurrentTab(tab);
    }
  };

  return (
    <section className="flex justify-between gap-[10px] flex-col mx-40 py-6 max-xl:mx-0">
      <div>
        <EmployerProfileNavigation
          onSearchParamsChange={updateSearchParams}
          currentTab={currentTab}
          updateTab={updateTab}
        />
      </div>

      {currentTab === 0 && (
        <div>
          <EmployerProfile
            isApproved={fetchedEmployerProfile.employer.isApproved}
            employer={fetchedEmployerProfile.employer}
          />
        </div>
      )}

      {currentTab === 1 && (
        <div>
          <EmployerSettings
            isTwoFactorAuthEnabled={
              fetchedEmployerProfile.employer.isTwoFactorAuthEnabled
            }
          />
        </div>
      )}
    </section>
  );
};

export default EmployerProfilePage;
