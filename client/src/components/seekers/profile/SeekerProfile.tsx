'use client';

import React, { Fragment, useState } from 'react';

import { Trash } from 'lucide-react';

import useMediaQuery from '@/hooks/defaults/useMediaQuery.hook';

import { Seeker } from '@/types';

import Informations from './informations/Informations';
import Educations from './educations/Educations';
import Skills from './skills/Skills';
import Socials from './socials/Socials';
import Experiences from './experiences/Experiences';
import DeleteSeekerProfile from './DeleteSeekerProfile';
import UploadSeekerImage from './UploadSeekerImage';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Drawer } from '@/components/ui/drawer';

type SeekerProfileProps = {
  seeker: Seeker;
};

const SeekerProfile: React.FC<SeekerProfileProps> = React.memo(({ seeker }) => {
  const isLarge = useMediaQuery('(min-width: 1280px)');
  const [isDeleteProfileOpen, setIsDeleteProfileOpen] = useState(false);

  return (
    <Fragment>
      {isLarge && (
        <Dialog
          onOpenChange={setIsDeleteProfileOpen}
          open={isDeleteProfileOpen}
        >
          <DeleteSeekerProfile
            closeDialog={() => setIsDeleteProfileOpen(false)}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer
          onOpenChange={setIsDeleteProfileOpen}
          open={isDeleteProfileOpen}
        >
          <DeleteSeekerProfile
            closeDialog={() => setIsDeleteProfileOpen(false)}
            isDialog={false}
          />
        </Drawer>
      )}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-5">
            <UploadSeekerImage image={seeker?.image} />
            <Button
              className="flex items-center gap-3"
              variant="destructive"
              onClick={() => setIsDeleteProfileOpen(true)}
            >
              <div className="max-sm:hidden whitespace-nowrap">
                Delete Profile
              </div>
              <Trash color="#fff" />
            </Button>
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
