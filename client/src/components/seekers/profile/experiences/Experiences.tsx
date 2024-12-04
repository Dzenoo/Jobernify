"use client";

import React, { Fragment, useState } from "react";

import { ExperienceTypes } from "@/types";
import { Plus } from "lucide-react";

import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import ExperienceList from "./ExperienceList";
import ExperienceForm from "./forms/ExperienceForm";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";

type ExperiencesProps = {
  experience: ExperienceTypes[] | [];
};

const Experiences: React.FC<ExperiencesProps> = ({ experience }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [experienceId, setExperienceId] = useState<string | null>(null);
  const isEdit = Boolean(experienceId);
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const seekerExperience = experience.find(
    (experience) => experience._id === experienceId
  );

  const openForm = (id?: string) => {
    setExperienceId(id || null);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setExperienceId(null);
  };

  return (
    <Fragment>
      {isLarge && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {isOpen && (
            <ExperienceForm
              isEdit={isEdit}
              experienceId={experienceId}
              experience={seekerExperience as ExperienceTypes}
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
            <ExperienceForm
              isEdit={isEdit}
              experienceId={experienceId}
              experience={seekerExperience as ExperienceTypes}
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
            <h1 className="text-base-black">
              Experience ({experience.length})
            </h1>
          </div>
          <div>
            <Button
              className="flex items-center gap-3"
              variant="default"
              onClick={() => openForm()}
            >
              <div className="max-lg:hidden">Add Experience</div>
              <div>
                <Plus />
              </div>
            </Button>
          </div>
        </div>
        <div>
          <ExperienceList experiences={experience} openForm={openForm} />
        </div>
      </div>
    </Fragment>
  );
};

export default Experiences;
