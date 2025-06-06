import React from 'react';

import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import { Card, CardContent } from '@/components/ui/layout/card';
import { Button } from '@/components/ui/buttons/button';

type FilterApplicationsProps = {
  applicants: number;
  pending: number;
  interviews: number;
  rejected: number;
  accepted: number;
  status: string;
};

const FilterApplications: React.FC<FilterApplicationsProps> = ({
  applicants,
  pending,
  interviews,
  rejected,
  accepted,
  status,
}) => {
  const { updateSearchParams } = useSearchParams();

  const updateApplicationsFilters = (filter: string) => {
    updateSearchParams('status', filter);
  };

  const FilterApplicationsButtons = [
    {
      id: 1,
      title: 'All',
      data: applicants,
      filter: '',
      className: '',
    },
    {
      id: 2,
      title: 'Pending',
      data: pending,
      filter: 'Pending',
      className: 'border-yellow-500',
    },
    {
      id: 3,
      title: 'Interview',
      data: interviews,
      filter: 'Interview',
      className: 'border-blue-500',
    },
    {
      id: 4,
      title: 'Accepted',
      data: accepted,
      filter: 'Accepted',
      className: 'border-green-500',
    },
    {
      id: 5,
      title: 'Rejected',
      data: rejected,
      filter: 'Rejected',
      className: 'border-red-500',
    },
  ];

  return (
    <Card>
      <CardContent>
        <div className="flex items-center max-sm:overflow-auto gap-5 hide-scrollbar">
          {FilterApplicationsButtons.map(
            ({ id, title, data, filter, className }) => (
              <Button
                key={id}
                className={className}
                variant={status === filter ? 'default' : 'outline'}
                onClick={() => updateApplicationsFilters(filter)}
              >
                {title} ({data})
              </Button>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterApplications;
