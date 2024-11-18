import React from "react";
import ExperienceItem, { ExperienceItemProps } from "./ExperienceItem";

type ExperienceListProps = {
  experiences?: ExperienceItemProps[];
};

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => {
  return (
    <div>
      <div>
        {experiences?.length === 0 && (
          <p className="text-initial-gray">No experiences listed</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {experiences?.map((experience) => (
          <ExperienceItem
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
    </div>
  );
};

export default ExperienceList;
