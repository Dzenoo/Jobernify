import React from 'react';

import { findIndustriesData } from '@/lib/utils';

import { Employer } from '@/types';

type EmployerInformationsProps = {
  employer: Employer;
};

const EmployerData: React.FC<EmployerInformationsProps> = ({ employer }) => {
  const ProfileInformationArrays = [
    {
      id: '1',
      title: 'Company Name',
      data: employer?.name,
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-[3rem] flex-wrap max-md:gap-3">
        {ProfileInformationArrays.map(({ id, data, title }) => (
          <div key={id} className="flex flex-col gap-[3px]">
            <div>
              <p className="text-muted-foreground text-base">{title}</p>
            </div>
            <div>
              <h1 className="font-semibold">{data}</h1>
            </div>
          </div>
        ))}
        <div>
          <div>
            <h1>Address</h1>
          </div>
          <div>
            <p className="text-muted-foreground text-base">
              {employer?.address || 'No Address Available'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h1>Description</h1>
        </div>
        <div>
          <p className="text-muted-foreground text-base">
            {employer?.companyDescription || 'No Description Available'}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[3px]">
        <div>
          <h1 className="text-initial-black">Website</h1>
        </div>
        <div>
          <a href={employer?.website} target="_blank">
            <p className="text-blue-500 dark:text-blue-500">
              {employer?.website || 'No Website Available'}
            </p>
          </a>
        </div>
      </div>
      <div>
        <div>
          <h1>Industry</h1>
        </div>
        <div>
          <p className="text-muted-foreground text-base">
            {findIndustriesData(employer?.industry || '') ||
              'No Industry Available'}
          </p>
        </div>
      </div>
      <div>
        <div>
          <h1>Size</h1>
        </div>
        <div>
          <p className="text-muted-foreground text-base">
            {employer?.size || 'No Size Available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerData;
