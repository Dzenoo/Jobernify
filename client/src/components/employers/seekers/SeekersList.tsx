import React from 'react';

import { Search } from 'lucide-react';

import { Seeker } from '@/types';

import SeekerItem from './SeekerItem';

type SeekersListProps = {
  seekers: Seeker[];
};

const SeekersList: React.FC<SeekersListProps> = ({ seekers }) => {
  return (
    <div>
      {seekers.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-6">
          <div>
            <Search size={50} className="mb-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold ">No Seekers Found</h2>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Oops! It seems like there are no seekers found
            </p>
          </div>
        </div>
      )}
      <ul className="grid gap-3 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {seekers.length > 0 &&
          seekers.map((seeker) => (
            <SeekerItem seeker={seeker} key={seeker._id} />
          ))}
      </ul>
    </div>
  );
};

export default SeekersList;
