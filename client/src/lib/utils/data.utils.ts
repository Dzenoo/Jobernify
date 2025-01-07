import { SkillsInformationsData, industries, locations } from '@/constants';
import { uppercaseFirstLetter } from '../utils';

/**
 * Finds the industry label based on the industry value.
 * @param industry - The industry value.
 * @returns The industry label.
 */
export const findIndustriesData = (industry: string): string => {
  const foundedIndustry = industries.find((item) => item === industry);
  if (!foundedIndustry) return '';
  return uppercaseFirstLetter(foundedIndustry);
};

/**
 * Finds the location label based on the selected value.
 * @param selectedValue - The value of the selected location.
 * @returns The location label or "Location not found".
 */
export const findLocationData = (selectedValue: string): string => {
  const selectedOption = locations.find(
    (option) => option.value === selectedValue,
  );
  return selectedOption ? selectedOption.label : 'Location not found';
};

/**
 * Categorizes skills based on predefined categories.
 * @param skills - An array of skill titles.
 * @returns An object categorizing the skills.
 */
export const getSkillsData = (
  skills: string[],
): { [key: string]: string[] } => {
  const categorizedSkills: { [key: string]: string[] } = {};

  SkillsInformationsData.forEach((category) => {
    category.data.forEach((skill) => {
      if (!categorizedSkills[category.category]) {
        categorizedSkills[category.category] = [];
      }
      if (skills?.includes(skill.value)) {
        categorizedSkills[category.category].push(skill.title);
      }
    });
  });

  return categorizedSkills;
};

/**
 * Retrieves the skill names based on technology values.
 * @param technologies - An array of technology values.
 * @returns An array of skill names.
 */
export const getSkillNames = (technologies: string[]): string[] => {
  return technologies
    .map((technology) => {
      const matchingSkill = SkillsInformationsData.flatMap(
        (skill) => skill.data,
      ).find((data) => data.value === technology);
      return matchingSkill ? matchingSkill.title : null;
    })
    .filter((skillName): skillName is string => skillName !== null);
};

/**
 * Flattened array of skills for multiselect options.
 */
export const multiselectSkills = SkillsInformationsData.flatMap((category) =>
  category.data.map((data) => ({
    label: data.title,
    value: data.value,
  })),
);
