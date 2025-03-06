'use client';

import React, { Fragment, useState } from 'react';

import { IEducation } from '@/types';
import { Plus } from 'lucide-react';

import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';
import EducationList from './EducationList';
import EducationForm from './forms/EducationForm';

import { Button } from '@/components/ui/buttons/button';
import { Dialog } from '@/components/ui/layout/dialog';
import { Drawer } from '@/components/ui/layout/drawer';

type EducationsProps = {
  education: IEducation[] | [];
};

const Educations: React.FC<EducationsProps> = ({ education }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [educationId, setEducationId] = useState<string | null>(null);
  const isEdit = Boolean(educationId);
  const isSmall = useMediaQuery('(min-width: 650px)');
  const seekerEducation = education.find(
    (education) => education._id === educationId,
  );

  const openForm = (id?: string) => {
    setEducationId(id || null);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setEducationId(null);
  };

  return (
    <Fragment>
      {isSmall && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {isOpen && (
            <EducationForm
              isEdit={isEdit}
              educationId={educationId}
              education={seekerEducation as IEducation}
              isOpen={isOpen}
              closeForm={closeForm}
              isDialog={true}
            />
          )}
        </Dialog>
      )}
      {!isSmall && (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          {isOpen && (
            <EducationForm
              isEdit={isEdit}
              educationId={educationId}
              education={seekerEducation as IEducation}
              isOpen={isOpen}
              closeForm={closeForm}
              isDialog={false}
            />
          )}
        </Drawer>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center gap-3">
          <div>
            <h1 className="text-base-black">Education</h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={() => openForm()}
            >
              <div className="max-lg:hidden">Add Education</div>
              <div>
                <Plus />
              </div>
            </Button>
          </div>
        </div>
        <div>
          <EducationList educations={education} openForm={openForm} />
        </div>
      </div>
    </Fragment>
  );
};

export default Educations;
