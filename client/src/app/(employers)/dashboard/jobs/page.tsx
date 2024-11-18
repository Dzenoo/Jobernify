"use client";

import React from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication";
import useSearchParams from "@/hooks/defaults/useSearchParams";

import { getEmployerProfile } from "@/lib/actions/employers.actions";

import dynamic from "next/dynamic";
import LoadingDashboardJobs from "@/components/loaders/LoadingDashboardJobs";

import PaginatedList from "@/components/ui/paginate-list";
import SearchJobs from "@/components/employers/dashboard/jobs/search/SearchJobs";

const DashboardEmployerJobs = dynamic(
  () => import("@/components/employers/dashboard/jobs/DashboardEmployerJobs"),
  {
    loading: () => <LoadingDashboardJobs />,
  }
);

const DashboardJobsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: fetchedEmployer,
    isFetching,
    isRefetching,
    isLoading,
  } = useQuery({
    queryFn: () =>
      getEmployerProfile({
        token: token as string,
        page: searchParams.page || "1",
        srt: searchParams.sort || "",
        search: searchParams.query || "",
        type: "jobs",
      }),
    queryKey: ["jobs", searchParams],
  });

  const isLoadingJobs = isLoading || isFetching || isRefetching;
  const totalJobs = fetchedEmployer?.counts.totalJobs || 0;
  const itemsPerPage = 10;
  const currentPage = Number(searchParams.page) || 1;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between gap-3 max-xl:flex-col xl:items-center">
        <div>
          <h1 className="text-base-black">Jobs</h1>
          <p className="text-initial-gray">
            Easily edit, update, or remove listings to find the perfect
            candidates
          </p>
        </div>
        <SearchJobs query={searchParams.query} sort={searchParams.sort} />
      </div>
      {isLoadingJobs ? (
        <LoadingDashboardJobs />
      ) : (
        <DashboardEmployerJobs
          jobs={fetchedEmployer?.employer.jobs || []}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
      {totalJobs > 10 && (
        <PaginatedList
          onPageChange={(value) => updateSearchParams("page", value.toString())}
          totalItems={totalJobs}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
        />
      )}
    </section>
  );
};

export default DashboardJobsPage;
