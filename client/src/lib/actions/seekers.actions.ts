import qs from 'qs';

import {
  getApiHandler,
  postApiHandler,
  patchApiHandler,
  deleteApiHandler,
} from '../api';

import {
  FilterCounts,
  GetSeekerProfileDto,
  GetSeekersDto,
  Seeker,
} from '@/types';

/**
 * Fetches the seeker's profile.
 * @returns A promise resolving to the seeker profile.
 */
export const getSeekerProfile = async (
  query: GetSeekerProfileDto,
): Promise<{
  seeker: Seeker;
  totalSavedJobs: number;
  totalApplications: number;
}> => {
  const queryString = qs.stringify(query, { skipNulls: true });
  return await getApiHandler(`seekers/profile?${queryString}`);
};

/**
 * Edits the seeker's profile with provided form data.
 * @param formData - The form data for updating the seeker profile.
 * @returns A promise resolving to a response message.
 */
export const editSeekerProfile = async (
  formData: FormData,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/edit-profile`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * Deletes the seeker's profile.
 * @returns A promise resolving to a response message.
 */
export const deleteSeekerProfile = async (): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`seekers/delete-profile`);
};

/**
 * Adds a new education record to the seeker profile.
 * @param data - The education data to add.
 * @returns A promise resolving to a response message.
 */
export const addNewEducation = async (
  data: any,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/add-new-education`, data);
};

/**
 * Edits a education record to the seeker profile.
 * @param data - The education data to edit.
 * @returns A promise resolving to a response message.
 */
export const editEducation = async (
  data: any,
  educationId: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/edit-education/${educationId}`, data);
};

/**
 * Deletes an education record from the seeker profile.
 * @param educationId - The ID of the education record to delete.
 * @returns A promise resolving to a response message.
 */
export const deleteEducation = async (
  educationId: string,
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`seekers/delete-education/${educationId}`);
};

/**
 * Adds a new experience record to the seeker profile.
 * @param data - The experience data to add.
 * @returns A promise resolving to a response message.
 */
export const addNewExperience = async (
  data: any,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/add-new-experience`, data);
};

/**
 * Edits a experience record to the seeker profile.
 * @param data - The experience data to edit.
 * @returns A promise resolving to a response message.
 */
export const editExperience = async (
  data: any,
  experienceId: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/edit-experience/${experienceId}`, data);
};

/**
 * Deletes an experience record from the seeker profile.
 * @param educationId - The ID of the experience record to delete.
 * @returns A promise resolving to a response message.
 */
export const deleteExperience = async (
  experienceId: string,
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`seekers/delete-experience/${experienceId}`);
};

/**
 * Generates a job alert for the seeker.
 * @param formData - The form data for generating the job alert.
 * @returns A promise resolving to a response message.
 */
export const generateJobAlert = async (
  formData: FormData,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`seekers/create-job-alert`, formData);
};

/**
 * Follows an employer by seeker.
 * @param employerId - The ID of the employer to follow.
 * @returns A promise resolving to a response message.
 */
export const followEmployer = async (
  employerId: string,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`seekers/${employerId}/follow`, {});
};

/**
 * Fetches a list of seekers based on search query and skills.
 * @param params - An object containing page, skills, and search term.
 * @returns A promise resolving to the list of seekers and total count.
 */
export const getSeekers = async (
  query: GetSeekersDto,
): Promise<{
  seekers: Seeker[];
  totalSeekers: number;
  filterCounts: FilterCounts;
}> => {
  const queryString = qs.stringify(query, { skipNulls: true });
  return await getApiHandler(`seekers/all?${queryString}`);
};

/**
 * Fetches a seeker by their ID.
 * @param seekerId - The ID of the seeker.
 * @returns A promise resolving to the seeker's details.
 */
export const getSeekerById = async (
  seekerId: string,
): Promise<{ seeker: Seeker }> => {
  return await getApiHandler(`seekers/${seekerId}`);
};
