'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useGetSeekerById } from '@/hooks/queries/useGetSeekerById.query';

import { Seeker } from '@/types';

import NotFound from '@/components/shared/pages/NotFound';

import LoadingSeekerDetails from '@/components/templates/employers/LoadingSeekerDetails';
const SeekerDetailsInfo = dynamic(
  () => import('@/components/employers/seekers/details/SeekerDetailsInfo'),
  {
    loading: () => <LoadingSeekerDetails />,
  },
);

const SeekerDetailsPage = ({
  params: { seekerId },
}: {
  params: { seekerId: string };
}) => {
  const { data: fetchedSeeker, isLoading } = useGetSeekerById(seekerId);
  const className = 'base-margin overflow-auto flex gap-[10px] max-xl:flex-col';

  if (isLoading) {
    return (
      <div className={className}>
        <LoadingSeekerDetails />
      </div>
    );
  }

  if (!isLoading && !fetchedSeeker) {
    return <NotFound href="/seekers" />;
  }

  return (
    <section className={className}>
      <div className="basis-full grow flex flex-col gap-6">
        <SeekerDetailsInfo seeker={fetchedSeeker?.seeker as Seeker} />
      </div>
    </section>
  );
};

export default SeekerDetailsPage;
