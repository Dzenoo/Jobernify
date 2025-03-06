'use client';

import React, { Fragment, useState } from 'react';
import { AlertCircle, Edit, X } from 'lucide-react';

import { IEmployer } from '@/types';

import EmployerData from './informations/EmployerData';
import EditEmployerProfileForm from './informations/forms/EditEmployerProfileForm';
import ProfileImageUploader from '@/components/shared/ui/ProfileImageUploader';
import DeleteProfile from '@/components/shared/features/DeleteProfile';

import { Button } from '@/components/ui/buttons/button';
import { Separator } from '@/components/ui/layout/separator';
import { Alert, AlertDescription } from '@/components/ui/info/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/layout/card';

type EmployerProfileProps = {
  isApproved: boolean;
  employer: IEmployer;
};

const EmployerProfile: React.FC<EmployerProfileProps> = ({
  isApproved,
  employer,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-5">
            <ProfileImageUploader
              role="EMPLOYER"
              image={employer?.image}
              isApproved={isApproved}
            />
            <DeleteProfile role="EMPLOYER" />
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex flex-col gap-5 dark:border-[#3b3b3b]">
            <div className="flex justify-between items-center gap-3">
              <div>
                <h1 className="text-base-black">Company Information</h1>
              </div>
              <div>
                {isApproved ? (
                  <Button
                    variant={isEditMode ? 'outline' : 'default'}
                    className="flex items-center gap-3"
                    onClick={() =>
                      setIsEditMode((prevEditMode) => !prevEditMode)
                    }
                  >
                    <div className="max-lg:hidden">
                      {isEditMode ? 'Cancel' : 'Edit Profile'}
                    </div>
                    <div>{isEditMode ? <X /> : <Edit />}</div>
                  </Button>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      After approval, you can edit your profile.
                    </AlertDescription>
                  </Alert>
                )}
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
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default EmployerProfile;
