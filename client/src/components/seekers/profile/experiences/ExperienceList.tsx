import React, { useState } from 'react';

import ExperienceItem from './ExperienceItem';

import { IExperience } from '@/types';

import { Button } from '@/components/ui/buttons/button';

type ExperienceListProps = {
  experiences: IExperience[];
  openForm: (id: string) => void;
};

const ExperienceList: React.FC<ExperienceListProps> = ({
  experiences = [],
  openForm,
}) => {
  const [showAll, setShowAll] = useState(false);
  const experiencesList =
    experiences.length > 2
      ? showAll
        ? experiences
        : experiences.slice(0, 2)
      : experiences;

  return (
    <div>
      <div>
        {experiences?.length === 0 && (
          <p className="text-muted-foreground text-base">
            No experiences listed
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {experiencesList.map((experience) => (
          <ExperienceItem
            onEdit={() => openForm(experience._id)}
            key={experience._id}
            {...experience}
          />
        ))}
      </div>

      {experiences?.length > 2 && (
        <div>
          <Button
            variant="outline"
            onClick={() => setShowAll((prev) => !prev)}
            className="w-full"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceList;
