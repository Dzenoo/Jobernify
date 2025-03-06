'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import {
  SeekerQueryType,
  useSeekerQuery,
} from '@/hooks/queries/useSeeker.query';
import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import SearchSeekers from '@/components/employers/seekers/search/SearchSeekers';
import FilterSeekers from '@/components/employers/seekers/filters/FilterSeekers';
import PaginatedList from '@/components/ui/pagination/paginate-list';
import ExploreSeekers from '@/components/employers/seekers/explore/ExploreSeekers';
import NotFound from '@/components/shared/pages/NotFound';

import LoadingSeekers from '@/components/templates/employers/LoadingSeekers';

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
  } = useSeekerQuery({
    type: SeekerQueryType.GET_SEEKERS,
    params: {
      query: {
        page: searchParams.page || 1,
        search: searchParams.search || undefined,
        skills: searchParams.skills || undefined,
      },
    },
  });

  if (!fetchedSeekers && !isLoading) {
    return <NotFound />;
  }

  const seekersData = fetchedSeekers || {
    seekers: [],
    totalSeekers: 0,
    filterCounts: [],
  };

  const totalSeekers = seekersData.totalSeekers || 0;
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
          <FilterSeekers filterCounts={seekersData.filterCounts} />
        </div>

        <div>
          {isFiltering ? (
            <LoadingSeekers />
          ) : (
            <SeekersList seekers={seekersData.seekers || []} />
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
        <FilterSeekers filterCounts={seekersData.filterCounts} />
      </div>
    </section>
  );
};

export default SeekersPage;
