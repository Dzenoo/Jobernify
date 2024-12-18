'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useGetJobs } from '@/hooks/queries/useGetJobs.query';
import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import SearchJobs from '@/components/seekers/jobs/search/SearchJobs';
import FilterJobs from '@/components/seekers/jobs/filters/FilterJobs';
import PaginatedList from '@/components/ui/paginate-list';
import NotFound from '@/components/shared/pages/NotFound';

import LoadingSeekerInfo from '@/components/loaders/employers/LoadingSeekerInfo';
const SeekerInfo = dynamic(
  () => import('@/components/seekers/jobs/SeekerInfo'),
  {
    loading: () => <LoadingSeekerInfo />,
  },
);

import LoadingPopularJobs from '@/components/loaders/seekers/LoadingPopularJobs';
const PopularJobsInfo = dynamic(
  () => import('@/components/seekers/jobs/PopularJobsInfo'),
  {
    loading: () => <LoadingPopularJobs />,
  },
);

import LoadingJobsSkeleton from '@/components/loaders/seekers/LoadingJobsSkeleton';
const JobsList = dynamic(() => import('@/components/seekers/jobs/JobsList'), {
  loading: () => <LoadingJobsSkeleton />,
});

const Jobs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const {
    data: fetchedJobs,
    isLoading,
    isFetching,
    isRefetching,
  } = useGetJobs({ params: searchParams });

  if (!fetchedJobs && !isLoading) {
    return <NotFound />;
  }

  const jobsData = fetchedJobs || {
    jobs: [],
    totalJobs: 0,
    popularJobs: [],
    filterCounts: [],
  };

  const totalJobs = jobsData.totalJobs;
  const isFiltering = isLoading || isFetching || isRefetching;

  return (
    <section className="flex justify-between gap-10 max-xl:flex-col">
      <div className="basis-2/5 flex flex-col gap-5">
        <SeekerInfo />
        <PopularJobsInfo jobs={jobsData.popularJobs} />
      </div>

      <div className="basis-full grow flex flex-col gap-4">
        <SearchJobs query={searchParams.query} sort={searchParams.sort} />

        <div className="xl:hidden">
          <FilterJobs filterCounts={jobsData.filterCounts} />
        </div>

        <div>
          {isFiltering ? (
            <LoadingJobsSkeleton />
          ) : (
            <JobsList jobs={jobsData.jobs} />
          )}
        </div>

        {totalJobs > 10 && (
          <PaginatedList
            onPageChange={(value) =>
              updateSearchParams('page', value.toString())
            }
            totalItems={totalJobs}
            itemsPerPage={10}
            currentPage={Number(searchParams.page) || 1}
          />
        )}
      </div>

      <div className="basis-2/5 max-xl:hidden">
        <FilterJobs filterCounts={jobsData.filterCounts} />
      </div>
    </section>
  );
};

export default Jobs;
