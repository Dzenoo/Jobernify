"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { getEmployers } from "@/lib/actions/employers.actions";

import LoadingCompaniesSkeleton from "@/components/loaders/seekers/LoadingCompanies";

import PaginatedList from "@/components/ui/paginate-list";
import useSearchParams from "@/hooks/defaults/useSearchParams.hook";
import SearchEmployers from "@/components/seekers/employers/search/SearchEmployers";

const EmployersList = dynamic(
  () => import("@/components/seekers/employers/EmployersList"),
  {
    loading: () => <LoadingCompaniesSkeleton />,
  }
);

const Companies = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { token } = useAuthentication().getCookieHandler();
  const {
    data: fetchedCompanies,
    refetch,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryFn: () =>
      getEmployers({
        token: token as string,
        page: searchParams.page || "1",
        sort: searchParams.sort || "",
        search: searchParams.query || "",
        industry: searchParams.industry || "",
        size: searchParams.size || "",
        location: searchParams.location || "",
      }),
    queryKey: ["companies", searchParams],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const totalEmployers = fetchedCompanies?.totalEmployers!;
  const isFiltering = isLoading || isFetching || isRefetching;

  return (
    <section className="flex flex-col gap-10">
      <div>
        <SearchEmployers searchParams={searchParams} />
      </div>
      <div>
        {isFiltering ? (
          <LoadingCompaniesSkeleton />
        ) : (
          <EmployersList employers={fetchedCompanies?.employers} />
        )}
      </div>
      {totalEmployers > 10 && (
        <PaginatedList
          onPageChange={(value) => updateSearchParams("page", value.toString())}
          totalItems={totalEmployers}
          itemsPerPage={10}
          currentPage={Number(searchParams.page) || 1}
        />
      )}
    </section>
  );
};

export default Companies;
