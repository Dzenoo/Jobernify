'use client';

import React from 'react';

import { useSearchParams } from '@/hooks/core/useSearchParams.hook';
import { useGetEmployer } from '@/hooks/queries/useGetEmployer.query';

import dynamic from 'next/dynamic';
import LoadingDashboardJobs from '@/components/loaders/employers/LoadingDashboardJobs';

import PaginatedList from '@/components/ui/paginate-list';
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
  const {
    data: fetchedEmployer,
    isFetching,
    isRefetching,
    isLoading,
  } = useGetEmployer(searchParams);

  const isLoadingJobs = isLoading || isFetching || isRefetching;

  if (typeof window === 'undefined' || isLoadingJobs) {
    return <LoadingDashboardJobs />;
  }

  const totalJobs = fetchedEmployer?.counts.totalJobs || 0;
  const itemsPerPage = 10;
  const currentPage = Number(searchParams.page) || 1;

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

        <SearchJobs query={searchParams.query} sort={searchParams.sort} />
      </div>

      <DashboardEmployerJobs
        jobs={fetchedEmployer?.employer.jobs || []}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

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
