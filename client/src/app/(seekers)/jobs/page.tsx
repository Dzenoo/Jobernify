"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { getJobs } from "@/lib/actions/jobs.actions";

import LoadingJobsSkeleton from "@/components/loaders/seekers/LoadingJobsSkeleton";
import LoadingPopularJobs from "@/components/loaders/seekers/LoadingPopularJobs";
import PopularJobsInfo from "@/components/seekers/jobs/PopularJobsInfo";
import FilterJobs from "@/components/seekers/jobs/filters/FilterJobs";
import PaginatedList from "@/components/ui/paginate-list";
import useSearchParams from "@/hooks/defaults/useSearchParams.hook";
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
        sort: searchParams.sort || "",
        search: searchParams.query || "",
        position: searchParams.position || "",
        salary: searchParams.salary || "",
        level: searchParams.level || "",
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
    <section className="flex justify-between gap-10 max-xl:flex-col">
      <div className="basis-2/5 flex flex-col gap-5">
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
      <div className="basis-2/5 max-xl:hidden">
        <FilterJobs filterCounts={fetchedJobs?.filterCounts || []} />
      </div>
    </section>
  );
};

export default Jobs;
