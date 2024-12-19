'use client';

import React, { Fragment, useState } from 'react';

import { Trash } from 'lucide-react';

import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';

import { Employer } from '@/types';

import UploadEmployerImage from './UploadEmployerImage';
import DeleteEmployerProfile from './DeleteEmployerProfile';
import EmployerProfile from './informations/EmployerProfile';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog } from '@/components/ui/dialog';
import { Drawer } from '@/components/ui/drawer';

type EmployerSettingsProps = {
  employer: Employer;
};

const EmployerSettings: React.FC<EmployerSettingsProps> = ({ employer }) => {
  const isSmall = useMediaQuery('(min-width: 650px)');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <Fragment>
      {isSmall && (
        <Dialog onOpenChange={setIsDeleteOpen} open={isDeleteOpen}>
          <DeleteEmployerProfile
            closeDelete={() => setIsDeleteOpen(false)}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isSmall && (
        <Drawer onOpenChange={setIsDeleteOpen} open={isDeleteOpen}>
          <DeleteEmployerProfile
            closeDelete={() => setIsDeleteOpen(false)}
            isDialog={false}
          />
        </Drawer>
      )}
      <div className="flex justify-between items-start gap-5">
        <UploadEmployerImage image={employer?.image} />
        <Button
          className="flex items-center gap-3"
          variant="destructive"
          onClick={() => setIsDeleteOpen(true)}
        >
          <div className="max-sm:hidden whitespace-nowrap">Delete Profile</div>
          <Trash color="#fff" />
        </Button>
      </div>
      <div className="flex flex-col gap-10">
        <Separator className="relative top-5" />
        <EmployerProfile employer={employer} />
      </div>
    </Fragment>
  );
};

export default EmployerSettings;
