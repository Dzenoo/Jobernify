import React from 'react';

import { Search } from 'lucide-react';

import { IEmployer } from '@/types';

import EmployerItem from './EmployerItem';

type EmployersListProps = {
  employers: IEmployer[];
};

const EmployersList: React.FC<EmployersListProps> = React.memo(
  ({ employers }) => {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-base-black">Employers</h1>
        </div>
        {employers.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center gap-2 py-6">
            <div>
              <Search size={50} className="mb-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold ">No Employers Found</h2>
            </div>
            <div>
              <p className="text-muted-foreground">
                We're sorry, but it appears there are no employers to display at
                this time.
              </p>
            </div>
          </div>
        )}
        <ul className="grid gap-3 grid-cols-3 max-[1680px]:grid-cols-2 max-lg:grid-cols-1">
          {employers.map((employer) => (
            <EmployerItem employer={employer} key={employer._id} />
          ))}
        </ul>
      </div>
    );
  },
);

export default EmployersList;
