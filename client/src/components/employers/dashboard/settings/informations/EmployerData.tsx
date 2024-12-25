import React from 'react';

import { findIndustriesData } from '@/lib/utils';

import { Employer } from '@/types';

type EmployerDataProps = {
  employer: Employer;
};

const EmployerData: React.FC<EmployerDataProps> = ({ employer }) => {
  const profileFields = [
    {
      id: 1,
      title: 'Company Name',
      value: employer?.name || 'N/A',
    },
    {
      id: 2,
      title: 'Address',
      value: employer?.address || 'N/A',
    },
    {
      id: 3,
      title: 'Description',
      value: employer?.companyDescription || 'N/A',
    },
    {
      id: 4,
      title: 'Industry',
      value: findIndustriesData(employer?.industry) || 'N/A',
    },
    {
      id: 5,
      title: 'Size',
      value: employer?.size || 'N/A',
    },
    {
      id: 6,
      title: 'Website',
      value: employer?.website || 'N/A',
      href: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {profileFields.map((field) => (
        <FieldGroup
          key={field.id}
          title={field.title}
          value={field.value}
          href={field.href}
        />
      ))}
    </div>
  );
};

export default EmployerData;

type FieldGroupProps = {
  title: string;
  value: string | number;
  href?: boolean;
};

const FieldGroup: React.FC<FieldGroupProps> = ({ title, value, href }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        {href && value.toString().includes('http') ? (
          <a
            href={value as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-500"
          >
            {value}
          </a>
        ) : (
          <p className="text-muted-foreground text-base">{value}</p>
        )}
      </div>
    </div>
  );
};
