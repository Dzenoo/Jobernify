import { EmployerTypes, ResponseMessageTypes, SeekerTypes } from "@/types";
import {
  deleteApiHandler,
  getApiHandler,
  patchApiHandler,
  postApiHandler,
} from "../api";

/**
 * ===============================
 * Seeker API Handlers
 * ===============================
 */

/**
 * Fetches a list of employers with pagination, sorting, and search filters.
 * @param page - The page number (default: "1").
 * @param srt - The sorting parameter.
 * @param search - The search query for filtering employers.
 * @param token - The authentication token.
 * @returns A promise resolving to a list of employers and total employer count.
 */
export const getEmployers = async ({
  page = "1",
  sort = "",
  search = "",
  token,
  industry = "",
  size = "",
  location = "",
}: {
  token: string;
  page: string;
  sort: string;
  search: string;
  industry: string;
  size: string;
  location: string;
}): Promise<{ employers: EmployerTypes[]; totalEmployers: number }> => {
  return await getApiHandler(
    `employers/all?page=${page}&sort=${sort}&search=${search}&industry=${industry}&size=${size}&location=${location}`,
    token
  );
};

/**
 * Fetches the details of a specific employer, including jobs and reviews.
 * @param employerId - The ID of the employer.
 * @param token - The authentication token.
 * @param type - The type of data to fetch (default: "reviews").
 * @param page - The page number for paginated data (default: "1").
 * @returns A promise resolving to the employer details along with the total jobs and reviews count.
 */
export const getEmployerById = async (
  employerId: string,
  token: string,
  type: string = "reviews",
  page: number = 1
): Promise<{
  employer: EmployerTypes;
  totalJobs: number;
  totalReviews: number;
}> => {
  return await getApiHandler(
    `employers/${employerId}?page=${page}&limit=10&type=${type}`,
    token
  );
};

/**
 * Fetches the seeker's profile.
 * @param token - The authentication token.
 * @returns A promise resolving to the seeker profile.
 */
export const getSeekerProfile = async (
  token: string,
  page: number = 1,
  limit: number = 10
): Promise<{ seeker: SeekerTypes }> => {
  return await getApiHandler(
    `seekers/profile?page=${page}&limit=${limit}`,
    token
  );
};

/**
 * Follows an employer by seeker.
 * @param employerId - The ID of the employer to follow.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const followEmployer = async (
  employerId: string,
  token: string
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`seekers/${employerId}/follow`, {}, token);
};

/**
 * Edits the seeker's profile with provided form data.
 * @param formData - The form data for updating the seeker profile.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const editSeekerProfile = async (
  formData: FormData,
  token: string
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(
    `seekers/edit-profile`,
    formData,
    token,
    "multipart/form-data"
  );
};

/**
 * Adds a new education record to the seeker profile.
 * @param data - The education data to add.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const addNewEducation = async (
  data: any,
  token: string
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/add-new-education`, data, token);
};

/**
 * Adds a new experience record to the seeker profile.
 * @param data - The experience data to add.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const addNewExperience = async (
  data: any,
  token: string
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/add-new-experience`, data, token);
};

/**
 * Generates a job alert for the seeker.
 * @param formData - The form data for generating the job alert.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const generateJobAlert = async (
  formData: FormData,
  token: string
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`seekers/create-job-alert`, formData, token);
};

/**
 * Deletes the seeker's profile.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const deleteSeekerProfile = async (
  token: string
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`seekers/delete-profile`, token);
};

/**
 * Deletes an education record from the seeker profile.
 * @param educationId - The ID of the education record to delete.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const deleteEducation = async (
  educationId: string,
  token: string
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(
    `seekers/delete-education/${educationId}`,
    token
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
  token: string
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(
    `seekers/delete-experience/${experienceId}`,
    token
  );
};
