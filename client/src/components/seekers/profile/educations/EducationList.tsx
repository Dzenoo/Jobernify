import React from "react";

import EducationItem, { EducationItemProps } from "./EducationItem";

type EducationListProps = {
  educations?: EducationItemProps[];
};

const EducationList: React.FC<EducationListProps> = ({ educations }) => {
  return (
    <div>
      <div>
        {educations?.length === 0 && (
          <p className="text-initial-gray">No educations listed</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {educations?.map((education) => (
          <EducationItem
            _id={education._id}
            key={education._id}
            graduationDate={education.graduationDate}
            fieldOfStudy={education.fieldOfStudy}
            institution={education.institution}
            degree={education.degree}
          />
        ))}
      </div>
    </div>
  );
};

export default EducationList;
