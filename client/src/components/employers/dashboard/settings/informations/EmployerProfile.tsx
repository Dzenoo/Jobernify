import React, { useState } from 'react';

import { Edit, X } from 'lucide-react';

import EmployerData from './EmployerData';
import EditEmployerProfileForm from './forms/EditEmployerProfileForm';

import { Employer } from '@/types';

import { Button } from '@/components/ui/buttons/button';

type EmployerProfileProps = {
  employer: Employer;
};

const EmployerProfile: React.FC<EmployerProfileProps> = ({ employer }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-10 dark:border-[#3b3b3b]">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h1 className="text-base-black">Company Information</h1>
        </div>
        <div>
          <Button
            variant={isEditMode ? 'outline' : 'default'}
            className="flex items-center gap-3"
            onClick={() => setIsEditMode((prevEditMode) => !prevEditMode)}
          >
            <div className="max-lg:hidden">
              {isEditMode ? 'Cancel' : 'Edit Profile'}
            </div>
            <div>{isEditMode ? <X /> : <Edit />}</div>
          </Button>
        </div>
      </div>
      <div>
        {!isEditMode ? (
          <EmployerData employer={employer} />
        ) : (
          <EditEmployerProfileForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            employer={employer}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
