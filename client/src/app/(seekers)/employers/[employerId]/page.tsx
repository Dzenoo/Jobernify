'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import {
  EmployerQueryType,
  useEmployerQuery,
} from '@/hooks/queries/useEmployer.query';
import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import LoadingEmployerDetails from '@/components/templates/seekers/LoadingEmployerDetails';
import EmployerDetailsInfo from '@/components/seekers/employers/details/EmployerDetailsInfo';
import EmployerFilters from '@/components/seekers/employers/filters/EmployerFilters';
import PaginatedList from '@/components/ui/pagination/paginate-list';

import NotFound from '@/components/shared/pages/NotFound';

import LoadingJobsSkeleton from '@/components/templates/seekers/LoadingJobsSkeleton';

const JobsList = dynamic(() => import('@/components/seekers/jobs/JobsList'), {
  loading: () => <LoadingJobsSkeleton />,
});

const EmployerDetails = ({
  params,
  searchParams,
}: {
  params: { employerId: string };
  searchParams: { [key: string]: any };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { data: fetchedEmployer, isLoading } = useEmployerQuery({
    type: EmployerQueryType.GET_EMPLOYER_BY_ID,
    params: {
      employerId: params.employerId,
      query: {
        page: Number(searchParams.page) || 1,
        type: searchParams.type || undefined,
      },
    },
  });

  if (isLoading) {
    return <LoadingEmployerDetails />;
  }

  if (!fetchedEmployer) {
    return <NotFound />;
  }

  const searchParamsJobs = searchParams.section === 'jobs';

  let totalItems = 0;
  if (searchParamsJobs && fetchedEmployer.totalJobs) {
    totalItems = fetchedEmployer.totalJobs;
  }

  return (
    <section className="overflow-hidden mx-40 max-xl:mx-0">
      <div className="flex flex-col gap-6 justify-center overflow-auto">
        <EmployerDetailsInfo employer={fetchedEmployer.employer} />
        <EmployerFilters type={searchParams.section} />
      </div>

      <div className="flex flex-col gap-6 justify-center overflow-auto py-6">
        {searchParamsJobs && <JobsList jobs={fetchedEmployer.employer.jobs} />}
        {totalItems > 10 && (
          <PaginatedList
            onPageChange={(value) =>
              updateSearchParams('page', value.toString())
            }
            totalItems={totalItems}
            itemsPerPage={10}
            currentPage={Number(searchParams.page) || 1}
          />
        )}
      </div>
    </section>
  );
};

export default EmployerDetails;
