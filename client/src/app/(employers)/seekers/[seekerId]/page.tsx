'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import {
  SeekerQueryType,
  useSeekerQuery,
} from '@/hooks/queries/useSeeker.query';

import { ISeeker } from '@/types';

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
  const className = 'base-margin overflow-auto flex gap-[10px] max-xl:flex-col';

  const { data: fetchedSeeker, isLoading } = useSeekerQuery({
    type: SeekerQueryType.GET_SEEKER_BY_ID,
    params: { seekerId },
  });

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
        <SeekerDetailsInfo seeker={fetchedSeeker?.seeker as ISeeker} />
      </div>
    </section>
  );
};

export default SeekerDetailsPage;
