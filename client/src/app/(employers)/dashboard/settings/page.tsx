'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import useGetEmployer from '@/hooks/queries/useGetEmployer.query';

import LoadingEmployerSettings from '@/components/loaders/employers/LoadingEmployerSettings';

import NotFound from '@/components/shared/pages/NotFound';

const EmployerProfileInformation = dynamic(
  () => import('@/components/employers/dashboard/settings/EmployerSettings'),
  {
    loading: () => <LoadingEmployerSettings />,
  },
);

const SettingsPage = () => {
  const { data: fetchedEmployerProfile, isLoading } = useGetEmployer();

  if (!isLoading) {
    if (!fetchedEmployerProfile?.employer) {
      return <NotFound />;
    }

    return (
      <div className="flex justify-between gap-[10px] flex-col mx-40 py-6 max-xl:mx-0">
        <EmployerProfileInformation
          employer={fetchedEmployerProfile.employer}
        />
      </div>
    );
  }
};

export default SettingsPage;
