import React from 'react';

import { Control } from 'react-hook-form';
import { multiselectSkills } from '@/lib/utils';

import MultiSelect from '@/components/ui/multiselect';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

type SkillsProps = {
  control: Control<any>;
  onSelectSkills: (skills: string[]) => void;
};

const Skills: React.FC<SkillsProps> = ({ control, onSelectSkills }) => {
  return (
    <>
      <FormField
        control={control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Relevant Skills</FormLabel>
            <FormControl>
              <MultiSelect
                options={multiselectSkills}
                selectedValues={field.value || []}
                onChange={(selectedValues) => onSelectSkills(selectedValues)}
              />
            </FormControl>
            <FormDescription>
              Choose multiple skills that are essential for this job. Each skill
              should be clearly defined and relevant to the role. You can select
              as many skills as needed, but ensure each is between 1 to 16
              characters long.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Skills;
