'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import {
  ApplicationsQueryType,
  useApplicationsQuery,
} from '@/hooks/queries/useApplication.query';
import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import FilterApplications from '@/components/employers/dashboard/jobs/applications/filter/FilterApplications';
import LoadingJobApplications from '@/components/templates/employers/LoadingJobApplications';

import PaginatedList from '@/components/ui/pagination/paginate-list';
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
  const { data, isLoading, isFetching, isRefetching } = useApplicationsQuery({
    type: ApplicationsQueryType.GET_APPLICATIONS,
    params: {
      jobId: params.jobId,
      query: {
        page: Number(searchParams.page) || 1,
        status: searchParams.status || undefined,
      },
    },
  });

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
  const totalApplications = applicationsData.totalApplications;
  const currentPage = Number(searchParams.page) || 1;
  const itemsPerPage = 10;

  return (
    <section className="flex flex-col gap-8">
      <div>
        <div>
          <h1 className="text-base-black">{applicationsData.job}</h1>
        </div>

        <div>
          <p className="text-muted-foreground text-base">
            Manage your applications to find the perfect candidates for this job
          </p>
        </div>
      </div>

      <FilterApplications
        applicants={applicationsData.totalApplications}
        pending={applicationsData.totalPendingStatus}
        interviews={applicationsData.totalInterviewStatus}
        rejected={applicationsData.totalRejectedStatus}
        accepted={applicationsData.totalAcceptedStatus}
        status={searchParams.status}
      />

      {isLoadingJobApplications ? (
        <LoadingJobApplications />
      ) : (
        <Applications
          applications={applicationsData.applications}
          currentPage={1}
          itemsPerPage={10}
        />
      )}

      {totalApplications > 10 && (
        <PaginatedList
          onPageChange={(value) => updateSearchParams('page', value.toString())}
          totalItems={totalApplications}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      )}
    </section>
  );
};

export default JobApplicationsPage;
