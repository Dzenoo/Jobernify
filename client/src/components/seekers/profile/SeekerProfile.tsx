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
        <CardContent className="flex flex-col gap-10">
          <Informations seeker={seeker} />
          <Socials seeker={seeker} />
          <Experiences experience={seeker?.experience} />
          <Educations education={seeker?.education} />
          <Skills skills={seeker?.skills} />
        </CardContent>
      </Card>
    </Fragment>
  );
});

export default SeekerProfile;
