"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import useSearchParams from "@/hooks/defaults/useSearchParams.hook";

import { getEmployerById } from "@/lib/actions/employers.actions";

import LoadingCompanyDetails from "@/components/loaders/seekers/LoadingCompanyDetails";
import EmployerDetailsInfo from "@/components/seekers/employers/details/EmployerDetailsInfo";
import EmployerFilters from "@/components/seekers/employers/filters/EmployerFilters";
import PaginatedList from "@/components/ui/paginate-list";

import NotFound from "@/components/shared/pages/NotFound";

import LoadingJobsSkeleton from "@/components/loaders/seekers/LoadingJobsSkeleton";
const JobsList = dynamic(() => import("@/components/seekers/jobs/JobsList"), {
  loading: () => <LoadingJobsSkeleton />,
});

const CompanyDetails = ({
  params,
  searchParams,
}: {
  params: { companyId: string };
  searchParams: { [key: string]: any };
}) => {
  const { updateSearchParams } = useSearchParams();
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedCompany, isLoading } = useQuery({
    queryFn: () => {
      if (!token) {
        throw new Error("Unauthorized!");
      }

      return getEmployerById(
        params.companyId,
        token,
        searchParams.section,
        Number(searchParams.page) || 1
      );
    },
    queryKey: [
      "company",
      params.companyId,
      searchParams.section,
      searchParams.page,
    ],
  });

  if (isLoading) {
    return <LoadingCompanyDetails />;
  }

  if (!fetchedCompany) {
    return <NotFound />;
  }

  const searchParamsJobs = searchParams.section === "jobs";

  let totalItems = 0;
  if (searchParamsJobs && fetchedCompany.totalJobs) {
    totalItems = fetchedCompany.totalJobs;
  }

  return (
    <section className="overflow-hidden mx-40 max-xl:mx-0">
      <div className="flex flex-col gap-6 justify-center overflow-auto">
        <EmployerDetailsInfo employer={fetchedCompany.employer} />
        <EmployerFilters type={searchParams.section} />
      </div>

      <div className="flex flex-col gap-6 justify-center overflow-auto py-6">
        {searchParamsJobs && <JobsList jobs={fetchedCompany.employer.jobs} />}
        {totalItems > 10 && (
          <PaginatedList
            onPageChange={(value) =>
              updateSearchParams("page", value.toString())
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

export default CompanyDetails;
