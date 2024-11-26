import React, { useState } from "react";

import EducationItem from "./EducationItem";
import { Button } from "@/components/ui/button";
import { EducationTypes } from "@/types";

type EducationListProps = {
  educations?: EducationTypes[];
  openForm: (id: string) => void;
};

const EducationList: React.FC<EducationListProps> = ({
  educations = [],
  openForm,
}) => {
  const [showAll, setShowAll] = useState(false);
  const educationsList =
    educations!.length > 2
      ? showAll
        ? educations
        : educations?.slice(0, 2)
      : educations;

  return (
    <div>
      <div>
        {educations?.length === 0 && (
          <p className="text-initial-gray">No educations listed</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {educationsList?.map((education) => (
          <EducationItem
            onEdit={() => openForm(education._id)}
            key={education._id}
            {...education}
          />
        ))}
      </div>
      {educations!.length > 2 && (
        <div>
          <Button
            variant="outline"
            onClick={() => setShowAll((prev) => !prev)}
            className="w-full"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationList;
