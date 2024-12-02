"use client";

import React, { Fragment, useState } from "react";

import { EducationTypes, SeekerTypes } from "@/types";
import { Plus } from "lucide-react";

import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import EducationList from "./EducationList";
import EducationForm from "./forms/EducationForm";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";

type EducationsProps = {
  seeker: Pick<SeekerTypes, "education">;
};

const Educations: React.FC<EducationsProps> = ({ seeker: { education } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [educationId, setEducationId] = useState<string | null>(null);
  const isEdit = Boolean(educationId);
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const seekerEducation = education.find(
    (education) => education._id === educationId
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
      {isLarge && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {isOpen && (
            <EducationForm
              isEdit={isEdit}
              educationId={educationId}
              education={seekerEducation as EducationTypes}
              isOpen={isOpen}
              closeForm={closeForm}
              isDialog={true}
            />
          )}
        </Dialog>
      )}
      {!isLarge && (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          {isOpen && (
            <EducationForm
              isEdit={isEdit}
              educationId={educationId}
              education={seekerEducation as EducationTypes}
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
