import React from 'react';

import { ISeeker } from '@/types';
import { FieldGroup } from '@/helpers';

type SeekerDataProps = {
  seeker: ISeeker;
};

const SeekerData: React.FC<SeekerDataProps> = ({ seeker }) => {
  const SeekerDataArray = [
    {
      id: 1,
      title: 'First Name',
      value: seeker?.first_name,
    },
    {
      id: 2,
      title: 'Last Name',
      value: seeker?.last_name,
    },
    {
      id: 3,
      title: 'Headline',
      value: seeker?.headline || 'N/A',
    },
    {
      id: 4,
      title: 'Biography',
      value: seeker?.biography || 'N/A',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {SeekerDataArray.map((field) => (
        <FieldGroup key={field.id} title={field.title} value={field.value} />
      ))}
    </div>
  );
};

export default SeekerData;
