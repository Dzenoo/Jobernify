"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { getEmployerById } from "@/lib/actions/employers.actions";

import LoadingJobsSkeleton from "@/components/loaders/seekers/LoadingJobsSkeleton";
import LoadingReviewsSkeleton from "@/components/loaders/seekers/LoadingReviews";
import EmployerDetailsInfo from "@/components/seekers/employers/details/EmployerDetailsInfo";
import EmployerFilters from "@/components/seekers/employers/filters/EmployerFilters";

import PaginatedList from "@/components/ui/paginate-list";
import useSearchParams from "@/hooks/defaults/useSearchParams.hook";
import LoadingCompanyDetails from "@/components/loaders/seekers/LoadingCompanyDetails";
import NotFound from "@/components/shared/pages/NotFound";

const ReviewsList = dynamic(
  () => import("@/components/seekers/employers/details/reviews/ReviewsList"),
  {
    loading: () => <LoadingReviewsSkeleton />,
  }
);
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
  const {
    data: fetchedCompany,
    refetch,
    isFetching,
    isLoading,
    isRefetching,
  } = useQuery({
    queryFn: () =>
      getEmployerById(
        params.companyId,
        token as string,
        searchParams.section,
        searchParams.page
      ),
    queryKey: [
      "company",
      params.companyId,
      searchParams.section,
      searchParams.page,
    ],
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const searchParamsJobs = searchParams?.section === "jobs";
  const searchParamsReviews = searchParams?.section === "reviews";

  let totalItems = 0;
  if (searchParamsJobs && fetchedCompany?.totalJobs) {
    totalItems = fetchedCompany?.totalJobs;
  } else if (searchParamsReviews && fetchedCompany?.totalReviews) {
    totalItems = fetchedCompany?.totalReviews;
  }

  const isFiltering = isLoading || isFetching || isRefetching;

  if (!isLoading && !fetchedCompany) {
    return <NotFound />;
  }

  return (
    <section className="overflow-hidden mx-40 max-xl:mx-0">
      {isFiltering ? (
        <LoadingCompanyDetails />
      ) : (
        <div className="flex flex-col gap-6 justify-center overflow-auto py-6">
          <div>
            <EmployerDetailsInfo employer={fetchedCompany?.employer!} />
          </div>
          <div>
            <EmployerFilters type={searchParams.section} />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6 justify-center overflow-auto py-6">
        {searchParamsJobs && (
          <>
            {isFiltering ? (
              <LoadingJobsSkeleton />
            ) : (
              <JobsList jobs={fetchedCompany?.employer?.jobs} />
            )}
          </>
        )}
        {searchParamsReviews && (
          <>
            {isFiltering ? (
              <LoadingReviewsSkeleton />
            ) : (
              <ReviewsList reviews={fetchedCompany?.employer.reviews} />
            )}
          </>
        )}
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
