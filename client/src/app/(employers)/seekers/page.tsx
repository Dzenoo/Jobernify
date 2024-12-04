"use client";

import React, { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { getSeekers } from "@/lib/actions/seekers.actions";

import FilterSeekers from "@/components/employers/seekers/filters/FilterSeekers";

import dynamic from "next/dynamic";
import LoadingSeekers from "@/components/loaders/employers/LoadingSeekers";
import PaginatedList from "@/components/ui/paginate-list";
import useSearchParams from "@/hooks/defaults/useSearchParams.hook";
import SearchSeekers from "@/components/employers/seekers/search/SearchSeekers";
import ExploreSeekers from "@/components/employers/seekers/explore/ExploreSeekers";

const SeekersList = dynamic(
  () => import("@/components/employers/seekers/SeekersList"),
  {
    loading: () => <LoadingSeekers />,
  }
);

const SeekersPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string & number };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: fetchedSeekers,
    refetch,
    isLoading,
    isRefetching,
    isFetching,
  } = useSuspenseQuery({
    queryFn: () =>
      getSeekers({
        token: token as string,
        page: searchParams.page || 1,
        search: searchParams.query || "",
        skills: searchParams.skills || "",
      }),
    queryKey: ["seekers", searchParams],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const totalSeekers = fetchedSeekers.totalSeekers || 0;
  const isFiltering = isLoading || isFetching || isRefetching;

  return (
    <section className="base-margin overflow-auto flex gap-[25px] max-xl:flex-col">
      <div className="basis-1/2">
        <ExploreSeekers />
      </div>
      <div className="basis-full grow flex flex-col gap-6">
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
            <SeekersList seekers={fetchedSeekers.seekers} />
          )}
        </div>
        {totalSeekers > 12 && (
          <PaginatedList
            onPageChange={(value) =>
              updateSearchParams("page", value.toString())
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
