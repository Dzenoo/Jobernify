'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import SearchEmployers from '@/components/seekers/employers/search/SearchEmployers';
import PaginatedList from '@/components/ui/pagination/paginate-list';
import NotFound from '@/components/shared/pages/NotFound';

import LoadingEmployersSkeleton from '@/components/templates/seekers/LoadingEmployers';
import { useGetEmployers } from '@/hooks/queries/useGetEmployers.query';
const EmployersList = dynamic(
  () => import('@/components/seekers/employers/EmployersList'),
  {
    loading: () => <LoadingEmployersSkeleton />,
  },
);

const Employers = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const {
    data: fetchedEmployers,
    isLoading,
    isFetching,
    isRefetching,
  } = useGetEmployers(searchParams);

  if (!fetchedEmployers && !isLoading) {
    return <NotFound />;
  }

  const employersData = fetchedEmployers || {
    employers: [],
    totalEmployers: 0,
  };

  const totalEmployers = employersData.totalEmployers;
  const isFiltering = isLoading || isFetching || isRefetching;

  return (
    <section className="flex flex-col gap-10">
      <div>
        <SearchEmployers searchParams={searchParams} />
      </div>

      <div>
        {isFiltering ? (
          <LoadingEmployersSkeleton />
        ) : (
          <EmployersList employers={employersData.employers} />
        )}
      </div>

      {totalEmployers > 10 && (
        <PaginatedList
          onPageChange={(value) => updateSearchParams('page', value.toString())}
          totalItems={totalEmployers}
          itemsPerPage={10}
          currentPage={Number(searchParams.page) || 1}
        />
      )}
    </section>
  );
};

export default Employers;
