"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication";

import { getJobs } from "@/lib/actions/jobs.actions";

import LoadingJobsSkeleton from "@/components/loaders/LoadingJobsSkeleton";
import LoadingPopularJobs from "@/components/loaders/LoadingPopularJobs";
import PopularJobsInfo from "@/components/seekers/jobs/PopularJobsInfo";
import FilterJobs from "@/components/seekers/jobs/filters/FilterJobs";
import PaginatedList from "@/components/ui/paginate-list";
import useSearchParams from "@/hooks/defaults/useSearchParams";
import SearchJobs from "@/components/seekers/jobs/search/SearchJobs";
import SeekerInfo from "@/components/seekers/jobs/SeekerInfo";

const JobsList = dynamic(() => import("@/components/seekers/jobs/JobsList"), {
  loading: () => <LoadingJobsSkeleton />,
});

const Jobs = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: fetchedJobs,
    refetch,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryFn: () =>
      getJobs({
        token: token as string,
        page: searchParams.page || "1",
        srt: searchParams.sort || "",
        search: searchParams.query || "",
        position: searchParams.position || "",
        salaryRange: searchParams.salaryRange || "",
        seniority: searchParams.seniority || "",
        type: searchParams.type || "",
      }),
    queryKey: ["jobs", searchParams],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const totalJobs = fetchedJobs?.totalJobs || 0;
  const isFiltering = isLoading || isFetching || isRefetching;

  return (
    <section className="flex justify-between gap-[25px] max-xl:flex-col">
      <div className="basis-1/2 flex flex-col gap-5">
        <div>
          <SeekerInfo />
        </div>
        <div>
          {isFiltering ? (
            <LoadingPopularJobs />
          ) : (
            <PopularJobsInfo
              jobs={(fetchedJobs && fetchedJobs.popularJobs) || []}
            />
          )}
        </div>
      </div>
      <div className="basis-full grow flex flex-col gap-6">
        <div>
          <SearchJobs query={searchParams.query} sort={searchParams.sort} />
        </div>
        <div className="xl:hidden">
          <FilterJobs filterCounts={fetchedJobs?.filterCounts || []} />
        </div>
        <div>
          {isFiltering ? (
            <LoadingJobsSkeleton />
          ) : (
            <JobsList jobs={fetchedJobs?.jobs} />
          )}
        </div>
        {totalJobs > 10 && (
          <PaginatedList
            onPageChange={(value) =>
              updateSearchParams("page", value.toString())
            }
            totalItems={totalJobs}
            itemsPerPage={10}
            currentPage={Number(searchParams.page) || 1}
          />
        )}
      </div>
      <div className="max-xl:hidden basis-1/2">
        <FilterJobs filterCounts={fetchedJobs?.filterCounts || []} />
      </div>
    </section>
  );
};

export default Jobs;
