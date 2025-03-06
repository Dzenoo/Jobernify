'use client';

import React from 'react';

import {
  EmployerQueryType,
  useEmployerQuery,
} from '@/hooks/queries/useEmployer.query';

import Followers from '@/components/employers/dashboard/overview/Followers';
import JobsPerMonth from '@/components/employers/dashboard/overview/JobsPerMonth';
import Statistics from '@/components/employers/dashboard/overview/Statistics';
import Types from '@/components/employers/dashboard/overview/Types';
import LoadingDashboard from '@/components/templates/employers/LoadingDashboard';

const Dashboard = () => {
  const { data: fetchedEmployer } = useEmployerQuery({
    type: EmployerQueryType.GET_EMPLOYER_PROFILE,
    params: { query: {} },
  });

  const {
    data: analytics,
    isLoading,
    isFetching,
    isRefetching,
  } = useEmployerQuery({
    type: EmployerQueryType.GET_EMPLOYER_ANALYTICS_INFO,
  });

  const isFiltering = isLoading || isFetching || isRefetching;

  if (isFiltering) {
    return <LoadingDashboard />;
  }

  if (!analytics) {
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
          <p className="text-muted-foreground text-base">
            Gain Valuable Insights
          </p>
        </div>
      </div>

      <div>
        <Statistics
          totalJobs={analytics.totalJobs}
          totalApplications={analytics.totalApplications}
          totalFollowers={analytics.totalFollowers}
          jobsThisMonth={analytics.jobsThisMonth}
          applicationsThisMonth={analytics.applicationsThisMonth}
          followersThisMonth={analytics.followersThisMonth}
        />
      </div>

      <div className="grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <JobsPerMonth data={analytics.jobsPerMonth} />
        </div>

        <div>
          <Followers data={analytics.followersOverTime} />
        </div>

        <div>
          <Types data={analytics.jobTypes} />
        </div>
      </div>

      <div></div>
    </section>
  );
};

export default Dashboard;
