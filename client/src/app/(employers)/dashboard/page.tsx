'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getEmployerAnalyticsInfo } from '@/lib/actions/employers.actions';

import { useGetEmployer } from '@/hooks/queries/useGetEmployer.query';
import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import Followers from '@/components/employers/dashboard/overview/Followers';
import JobsPerMonth from '@/components/employers/dashboard/overview/JobsPerMonth';
import Statistics from '@/components/employers/dashboard/overview/Statistics';
import Types from '@/components/employers/dashboard/overview/Types';

import LoadingDashboard from '@/components/loaders/employers/LoadingDashboard';

const Dashboard = () => {
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: analytics,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getEmployerAnalyticsInfo(token);
    },
    queryKey: ['analytics'],
  });
  const { data: fetchedEmployer } = useGetEmployer();

  const isFiltering = isLoading || isFetching || isRefetching;

  if (isFiltering) {
    return <LoadingDashboard />;
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div>
          <h1 className="text-base-black">
            Hi There, {fetchedEmployer?.employer.name}
          </h1>
        </div>
        <div>
          <p className="text-initial-gray">Gain Valuable Insights</p>
        </div>
      </div>
      <div>
        <Statistics
          totalJobs={analytics?.totalJobs || 0}
          totalApplications={analytics?.totalApplications || 0}
          totalFollowers={analytics?.totalFollowers || 0}
          jobsThisMonth={analytics?.jobsThisMonth || 0}
          applicationsThisMonth={analytics?.applicationsThisMonth || 0}
          followersThisMonth={analytics?.followersThisMonth || 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <JobsPerMonth data={analytics?.jobsPerMonth} />
        </div>
        <div>
          <Followers data={analytics?.followersOverTime} />
        </div>
        <div>
          <Types data={analytics?.jobTypes} />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Dashboard;
