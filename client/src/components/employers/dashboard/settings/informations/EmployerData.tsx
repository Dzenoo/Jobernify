import React from 'react';

import { findIndustriesData } from '@/lib/utils';

import { Employer } from '@/types';

type EmployerDataProps = {
  employer: Employer;
};

const EmployerData: React.FC<EmployerDataProps> = ({ employer }) => {
  const profileFields = [
    {
      id: 'companyName',
      title: 'Company Name',
      value: employer?.name ?? 'No Company Name Available',
    },
    {
      id: 'address',
      title: 'Address',
      value: employer?.address ?? 'No Address Available',
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-12 max-md:gap-3">
        {profileFields.map((field) => (
          <FieldGroup key={field.id} title={field.title} value={field.value} />
        ))}
      </div>

      <FieldGroup
        title="Description"
        value={employer?.companyDescription || 'No Description Available'}
      />

      <WebsiteField website={employer?.website} />

      <FieldGroup
        title="Industry"
        value={
          findIndustriesData(employer?.industry ?? '') ??
          'No Industry Available'
        }
      />

      <FieldGroup title="Size" value={employer?.size || 'No Size Available'} />
    </div>
  );
};

export default EmployerData;

type FieldGroupProps = {
  title: string;
  value: string | number;
};

const FieldGroup: React.FC<FieldGroupProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col gap-[3px]">
      <h2 className="text-muted-foreground text-base">{title}</h2>
      <h1 className="font-semibold">{value}</h1>
    </div>
  );
};

type WebsiteFieldProps = {
  website?: string | null;
};

const WebsiteField: React.FC<WebsiteFieldProps> = ({ website }) => {
  return (
    <div className="flex flex-col gap-[3px]">
      <h2 className="text-initial-black">Website</h2>
      {website ? (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-500"
        >
          {website}
        </a>
      ) : (
        <p className="text-muted-foreground text-base">No Website Available</p>
      )}
    </div>
  );
};
