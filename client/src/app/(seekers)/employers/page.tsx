'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';

import useAuthentication from '@/hooks/defaults/useAuthentication.hook';
import useSearchParams from '@/hooks/defaults/useSearchParams.hook';

import { getEmployers } from '@/lib/actions/employers.actions';

import SearchEmployers from '@/components/seekers/employers/search/SearchEmployers';
import PaginatedList from '@/components/ui/paginate-list';
import NotFound from '@/components/shared/pages/NotFound';

import LoadingEmployersSkeleton from '@/components/loaders/seekers/LoadingEmployers';
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
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: fetchedEmployers,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error('Unauthorized!');
      }

      return getEmployers({
        token: token,
        page: Number(searchParams.page) || 1,
        sort: searchParams.sort || '',
        search: searchParams.query || '',
        industry: searchParams.industry || '',
        size: searchParams.size || '',
        location: searchParams.location || '',
      });
    },
    queryKey: ['employers', searchParams],
  });

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
