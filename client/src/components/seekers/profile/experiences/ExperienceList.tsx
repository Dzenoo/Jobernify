import React, { useState } from "react";

import ExperienceItem from "./ExperienceItem";
import { Button } from "@/components/ui/button";
import { ExperienceTypes } from "@/types";

type ExperienceListProps = {
  experiences?: ExperienceTypes[];
  openForm: (id: string) => void;
};

const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences = [],
  openForm,
}) => {
  const [showAll, setShowAll] = useState(false);

  const experiencesList =
    experiences!.length > 2
      ? showAll
        ? experiences
        : experiences?.slice(0, 2)
      : experiences;

  return (
    <div className="flex flex-col gap-5">
      <div>
        {experiences?.length === 0 && (
          <p className="text-initial-gray">No experiences listed</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {experiencesList?.map((experience) => (
          <ExperienceItem
            onEdit={() => openForm(experience._id)}
            key={experience._id}
            _id={experience._id}
            jobTitle={experience.jobTitle}
            companyName={experience.companyName}
            startDate={experience.startDate}
            endDate={experience.endDate}
            level={experience.level}
            type={experience.type}
            location={experience.location}
            position={experience.position}
          />
        ))}
      </div>
      {experiences!.length > 2 && (
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

export default ExperienceList;
