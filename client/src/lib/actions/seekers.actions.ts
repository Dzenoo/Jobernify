import {
  getApiHandler,
  postApiHandler,
  patchApiHandler,
  deleteApiHandler,
} from '../api';

import { FilterCounts, Seeker } from '@/types';

/**
 * ===============================
 * Seeker API Handlers
 * ===============================
 */

/**
 * Fetches the seeker's profile.
 * @param token - The authentication token.
 * @returns A promise resolving to the seeker profile.
 */
export const getSeekerProfile = async (
  token: string,
  page: number = 1,
  limit: number = 10,
): Promise<{
  seeker: Seeker;
  totalSavedJobs: number;
  totalApplications: number;
}> => {
  return await getApiHandler(
    `seekers/profile?page=${page}&limit=${limit}`,
    token,
  );
};

/**
 * Edits the seeker's profile with provided form data.
 * @param formData - The form data for updating the seeker profile.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const editSeekerProfile = async (
  formData: FormData,
  token: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(
    `seekers/edit-profile`,
    formData,
    token,
    'multipart/form-data',
  );
};

/**
 * Deletes the seeker's profile.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const deleteSeekerProfile = async (
  token: string,
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`seekers/delete-profile`, token);
};

/**
 * Adds a new education record to the seeker profile.
 * @param data - The education data to add.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const addNewEducation = async (
  data: any,
  token: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/add-new-education`, data, token);
};

/**
 * Edits a education record to the seeker profile.
 * @param data - The education data to edit.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const editEducation = async (
  data: any,
  token: string,
  educationId: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(
    `seekers/edit-education/${educationId}`,
    data,
    token,
  );
};

/**
 * Deletes an education record from the seeker profile.
 * @param educationId - The ID of the education record to delete.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const deleteEducation = async (
  educationId: string,
  token: string,
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(
    `seekers/delete-education/${educationId}`,
    token,
  );
};

/**
 * Adds a new experience record to the seeker profile.
 * @param data - The experience data to add.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const addNewExperience = async (
  data: any,
  token: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/add-new-experience`, data, token);
};

/**
 * Edits a experience record to the seeker profile.
 * @param data - The experience data to edit.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const editExperience = async (
  data: any,
  token: string,
  experienceId: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(
    `seekers/edit-experience/${experienceId}`,
    data,
    token,
  );
};

/**
 * Deletes an experience record from the seeker profile.
 * @param educationId - The ID of the experience record to delete.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const deleteExperience = async (
  experienceId: string,
  token: string,
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(
    `seekers/delete-experience/${experienceId}`,
    token,
  );
};

/**
 * Generates a job alert for the seeker.
 * @param formData - The form data for generating the job alert.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const generateJobAlert = async (
  formData: FormData,
  token: string,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`seekers/create-job-alert`, formData, token);
};

/**
 * Follows an employer by seeker.
 * @param employerId - The ID of the employer to follow.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const followEmployer = async (
  employerId: string,
  token: string,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`seekers/${employerId}/follow`, {}, token);
};

/**
 * Fetches a list of seekers based on search query and skills.
 * @param params - An object containing token, page, skills, and search term.
 * @returns A promise resolving to the list of seekers and total count.
 */
export const getSeekers = async ({
  token,
  page = 1,
  search = '',
  skills = '',
}: {
  token: string;
  page: number;
  skills?: string | string[];
  search?: string;
}): Promise<{
  seekers: Seeker[];
  totalSeekers: number;
  filterCounts: FilterCounts;
}> => {
  return await getApiHandler(
    `seekers/all?page=${page}&search=${search}&skills=${skills}`,
    token,
  );
};

/**
 * Fetches a seeker by their ID.
 * @param seekerId - The ID of the seeker.
 * @param token - The authentication token for the employer.
 * @returns A promise resolving to the seeker's details.
 */
export const getSeekerById = async (
  seekerId: string,
  token: string,
): Promise<{ seeker: Seeker }> => {
  return await getApiHandler(`seekers/${seekerId}`, token);
};
