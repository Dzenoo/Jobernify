"use client";

import React from "react";

import dynamic from "next/dynamic";
import LoadingReviewForm from "@/components/loaders/LoadingReviewForm";

const ReviewCompanyForm = dynamic(
  () =>
    import("@/components/seekers/employers/details/reviews/ReviewCompanyForm"),
  {
    loading: () => <LoadingReviewForm />,
  }
);

const ReviewCompany = ({ params }: { params: { companyId: string } }) => {
  return (
    <section className="flex flex-col gap-[10px] overflow-hidden mx-40 max-xl:mx-0">
      <div className="flex flex-col gap-3">
        <div>
          <h1 className="text-base-black">Review Employer</h1>
        </div>
        <div>
          <p className="text-initial-gray">
            Get insights into company culture, hiring processes, and employee
            experiences.
          </p>
        </div>
      </div>
      <div>
        <ReviewCompanyForm employerId={params.companyId} />
      </div>
    </section>
  );
};

export default ReviewCompany;
