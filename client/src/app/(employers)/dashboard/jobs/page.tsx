'use client';

import React from 'react';

import {
  EmployerQueryType,
  useEmployerQuery,
} from '@/hooks/queries/useEmployer.query';
import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import dynamic from 'next/dynamic';
import LoadingDashboardJobs from '@/components/templates/employers/LoadingDashboardJobs';

import PaginatedList from '@/components/ui/pagination/paginate-list';
import SearchJobs from '@/components/employers/dashboard/jobs/search/SearchJobs';

const DashboardEmployerJobs = dynamic(
  () => import('@/components/employers/dashboard/jobs/DashboardEmployerJobs'),
  {
    loading: () => <LoadingDashboardJobs />,
  },
);

const DashboardJobsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { data, isFetching, isRefetching, isLoading } = useEmployerQuery({
    type: EmployerQueryType.GET_EMPLOYER_PROFILE,
    params: { query: {} },
  });

  const jobsData = data || {
    employer: {
      isApproved: false,
      jobs: [],
    },
    counts: { totalJobs: 0 },
  };

  const isLoadingJobs = isLoading || isFetching || isRefetching;
  const totalJobs = jobsData.counts.totalJobs;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between gap-3 max-xl:flex-col xl:items-center">
        <div>
          <div>
            <h1 className="text-base-black">Jobs</h1>
          </div>

          <div>
            <p className="text-muted-foreground text-base">
              Easily edit, update, or remove listings to find the perfect
              candidates
            </p>
          </div>
        </div>

        <SearchJobs
          isApproved={jobsData.employer.isApproved || false}
          query={searchParams.query}
          sort={searchParams.sort}
        />
      </div>

      {isLoadingJobs ? (
        <LoadingDashboardJobs />
      ) : (
        <DashboardEmployerJobs
          jobs={jobsData.employer.jobs || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      )}

      {totalJobs > 10 && (
        <PaginatedList
          onPageChange={(value) => updateSearchParams('page', value.toString())}
          totalItems={totalJobs}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      )}
    </section>
  );
};

export default DashboardJobsPage;
