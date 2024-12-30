'use client';

import React, { Fragment } from 'react';

import { Seeker } from '@/types';

import Informations from './informations/Informations';
import Educations from './educations/Educations';
import Skills from './skills/Skills';
import Socials from './socials/Socials';
import Experiences from './experiences/Experiences';
import DeleteSeekerProfile from './DeleteSeekerProfile';
import UploadSeekerImage from './UploadSeekerImage';

import { Card, CardContent, CardHeader } from '@/components/ui/layout/card';
import { Separator } from '@/components/ui/layout/separator';

type SeekerProfileProps = {
  seeker: Seeker;
};

const SeekerProfile: React.FC<SeekerProfileProps> = React.memo(({ seeker }) => {
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-5">
            <UploadSeekerImage image={seeker?.image} />
            <DeleteSeekerProfile />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-10">
          <Informations seeker={seeker} />
          <Separator />

          <Socials seeker={seeker} />
          <Separator />

          <Experiences experience={seeker?.experience} />
          <Separator />

          <Educations education={seeker?.education} />
          <Separator />

          <Skills skills={seeker?.skills} />
        </CardContent>
      </Card>
    </Fragment>
  );
});

export default SeekerProfile;
