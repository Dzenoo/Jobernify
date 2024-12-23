'use client';

import React, { Fragment } from 'react';

import { Employer } from '@/types';

import UploadEmployerImage from './UploadEmployerImage';
import DeleteEmployerProfile from './DeleteEmployerProfile';
import EmployerProfile from './informations/EmployerProfile';

import { Separator } from '@/components/ui/layout/separator';

type EmployerSettingsProps = {
  employer: Employer;
};

const EmployerSettings: React.FC<EmployerSettingsProps> = ({ employer }) => {
  return (
    <Fragment>
      <div className="flex justify-between items-start gap-5">
        <UploadEmployerImage image={employer?.image} />
        <DeleteEmployerProfile />
      </div>
      <div className="flex flex-col gap-10">
        <Separator className="relative top-5" />
        <EmployerProfile employer={employer} />
      </div>
    </Fragment>
  );
};

export default EmployerSettings;
