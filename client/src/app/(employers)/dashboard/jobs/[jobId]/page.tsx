'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useSearchParams } from '@/hooks/core/useSearchParams.hook';
import { useGetApplications } from '@/hooks/queries/useGetApplications.query';

import FilterApplications from '@/components/employers/dashboard/jobs/applications/filter/FilterApplications';
import LoadingJobApplications from '@/components/loaders/employers/LoadingJobApplications';

import PaginatedList from '@/components/ui/paginate-list';
import NotFound from '@/components/shared/pages/NotFound';

const Applications = dynamic(
  () =>
    import('@/components/employers/dashboard/jobs/applications/Applications'),
  {
    loading: () => <LoadingJobApplications />,
  },
);

const JobApplicationsPage = ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string };
  params: { jobId: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { data, isLoading, isFetching, isRefetching } = useGetApplications(
    params.jobId,
    searchParams,
  );

  if (!isLoading && !data) {
    return <NotFound href="/dashboard/jobs" />;
  }

  const applicationsData = data || {
    applications: [],
    job: '',
    totalApplications: 0,
    totalPendingStatus: 0,
    totalInterviewStatus: 0,
    totalRejectedStatus: 0,
    totalAcceptedStatus: 0,
  };

  const isLoadingJobApplications = isLoading || isFetching || isRefetching;
  const totalApplications = applicationsData.totalApplications || 0;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div>
          <h1 className="text-base-black">{applicationsData.job}</h1>
        </div>

        <div>
          <p className="text-initial-gray">
            Manage your applications to find the perfect candidates for this job
          </p>
        </div>
      </div>

      <div>
        <FilterApplications
          applicants={applicationsData.totalApplications}
          pending={applicationsData.totalPendingStatus}
          interviews={applicationsData.totalInterviewStatus}
          rejected={applicationsData.totalRejectedStatus}
          accepted={applicationsData.totalAcceptedStatus}
          status={searchParams.status}
        />
      </div>

      <div>
        {isLoadingJobApplications ? (
          <LoadingJobApplications />
        ) : (
          <Applications
            applications={applicationsData.applications}
            currentPage={1}
            itemsPerPage={10}
          />
        )}
      </div>

      {totalApplications > 10 && (
        <div>
          <PaginatedList
            onPageChange={(value) =>
              updateSearchParams('page', value.toString())
            }
            totalItems={totalApplications}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </section>
  );
};

export default JobApplicationsPage;
