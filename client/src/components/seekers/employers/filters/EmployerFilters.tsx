import React from 'react';

import useSearchParams from '@/hooks/defaults/useSearchParams.hook';

import { Button } from '@/components/ui/button';

enum EmployerType {
  jobs = 'jobs',
}

type EmployerTypeFilters = {
  type: keyof typeof EmployerType;
};

const EmployerFilters: React.FC<EmployerTypeFilters> = ({ type }) => {
  const { updateSearchParams } = useSearchParams();

  const FilterButtons = [
    {
      id: '1',
      title: 'Jobs',
      filter: 'jobs',
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {FilterButtons.map(({ id, filter, title }) => (
        <Button
          key={id}
          variant={type === filter ? 'default' : 'outline'}
          onClick={() => updateSearchParams('section', filter)}
        >
          {title}
        </Button>
      ))}
    </div>
  );
};

export default EmployerFilters;
