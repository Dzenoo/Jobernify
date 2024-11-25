"use client";

import React from "react";
import { useQuery } from "react-query";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { getSeekerById } from "@/lib/actions/seekers.actions";

import dynamic from "next/dynamic";
import LoadingSeekerDetails from "@/components/loaders/LoadingSeekerDetails";
import NotFound from "@/components/shared/pages/NotFound";

const SeekerDetailsInfo = dynamic(
  () => import("@/components/employers/seekers/details/SeekerDetailsInfo"),
  {
    loading: () => <LoadingSeekerDetails />,
  }
);

const SeekerDetailsPage = ({
  params: { seekerId },
}: {
  params: { seekerId: string };
}) => {
  const { token } = useAuthentication().getCookieHandler();
  const { data: fetchedSeeker, isLoading } = useQuery({
    queryFn: () => getSeekerById(seekerId, token as string),
    queryKey: ["seeker", { seekerId }],
  });

  if (!isLoading && !fetchedSeeker) {
    return <NotFound href="/seekers" />;
  }

  return (
    <section className="base-margin overflow-auto flex gap-[10px] max-xl:flex-col">
      <div className="basis-full grow flex flex-col gap-6">
        <SeekerDetailsInfo seeker={fetchedSeeker?.seeker!} />
      </div>
    </section>
  );
};

export default SeekerDetailsPage;
