'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useSearchParams } from '@/hooks/core/useSearchParams.hook';
import { useGetSeekers } from '@/hooks/queries/useGetSeekers.query';

import SearchSeekers from '@/components/employers/seekers/search/SearchSeekers';
import FilterSeekers from '@/components/employers/seekers/filters/FilterSeekers';
import PaginatedList from '@/components/ui/pagination/paginate-list';
import ExploreSeekers from '@/components/employers/seekers/explore/ExploreSeekers';

import LoadingSeekers from '@/components/loaders/employers/LoadingSeekers';
const SeekersList = dynamic(
  () => import('@/components/employers/seekers/SeekersList'),
  {
    loading: () => <LoadingSeekers />,
  },
);

const SeekersPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string & number };
}) => {
  const { updateSearchParams } = useSearchParams();
  const {
    data: fetchedSeekers,
    isLoading,
    isRefetching,
    isFetching,
  } = useGetSeekers(searchParams);

  const totalSeekers = fetchedSeekers?.totalSeekers || 0;
  const isFiltering = isLoading || isFetching || isRefetching;

  return (
    <section className="base-margin overflow-auto flex gap-5 max-xl:flex-col">
      <div className="basis-1/2">
        <ExploreSeekers />
      </div>

      <div className="basis-full grow flex flex-col gap-5">
        <div>
          <SearchSeekers query={searchParams.query} />
        </div>

        <div className="xl:hidden">
          <FilterSeekers />
        </div>

        <div>
          {isFiltering ? (
            <LoadingSeekers />
          ) : (
            <SeekersList seekers={fetchedSeekers?.seekers || []} />
          )}
        </div>

        {totalSeekers > 12 && (
          <PaginatedList
            onPageChange={(value) =>
              updateSearchParams('page', value.toString())
            }
            totalItems={totalSeekers}
            itemsPerPage={12}
            currentPage={Number(searchParams.page) || 1}
          />
        )}
      </div>

      <div className="max-xl:hidden basis-1/2">
        <FilterSeekers />
      </div>
    </section>
  );
};

export default SeekersPage;
