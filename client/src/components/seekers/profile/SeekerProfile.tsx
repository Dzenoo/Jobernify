'use client';

import React, { Fragment, useState } from 'react';
import { Edit, X } from 'lucide-react';

import { Seeker } from '@/types';

import SeekerData from './informations/SeekerData';
import Educations from './educations/Educations';
import Skills from './skills/Skills';
import Socials from './socials/Socials';
import EditSeekerProfileForm from './informations/forms/EditSeekerProfileForm';
import ProfileImageUploader from '@/components/shared/ProfileImageUploader';
import DeleteProfile from '@/components/shared/DeleteProfile';
import Experiences from './experiences/Experiences';

import { Card, CardContent, CardHeader } from '@/components/ui/layout/card';
import { Separator } from '@/components/ui/layout/separator';
import { Button } from '@/components/ui/buttons/button';

type SeekerProfileProps = {
  seeker: Seeker;
};

const SeekerProfile: React.FC<SeekerProfileProps> = React.memo(({ seeker }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-5">
            <ProfileImageUploader role="SEEKER" image={seeker?.image} />
            <DeleteProfile role="SEEKER" />
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-10">
          <div className="space-y-10">
            <div className="flex justify-between items-center gap-3">
              <div>
                <h1 className="text-base-black">Profile Information</h1>
              </div>
              <div>
                <Button
                  variant={isEditMode ? 'outline' : 'default'}
                  className="flex items-center gap-3"
                  onClick={() => setIsEditMode((prevEditMode) => !prevEditMode)}
                >
                  <div className="max-lg:hidden">
                    {isEditMode ? 'Cancel' : 'Edit Profile'}
                  </div>
                  <div>{isEditMode ? <X /> : <Edit />}</div>
                </Button>
              </div>
            </div>
            <div>
              {!isEditMode ? (
                <SeekerData seeker={seeker} />
              ) : (
                <EditSeekerProfileForm
                  isEditMode={isEditMode}
                  setIsEditMode={setIsEditMode}
                  seeker={seeker}
                />
              )}
            </div>
          </div>
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
