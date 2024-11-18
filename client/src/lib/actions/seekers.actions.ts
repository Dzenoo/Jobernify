import { EmployerTypes, ResponseMessageTypes, SeekerTypes } from "@/types";
import { deleteApiHandler, getApiHandler, patchApiHandler } from "../api";

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
  srt = "",
  search = "",
  token,
  industry = "",
  size = "",
  location = "",
}: {
  token: string;
  page: string;
  srt: string;
  search: string;
  industry: string;
  size: string;
  location: string;
}): Promise<{ employers: EmployerTypes[]; totalEmployers: number }> => {
  try {
    return await getApiHandler(
      `seeker/employers?page=${page}&srt=${srt}&search=${search}&industry=${industry}&size=${size}&location=${location}`,
      token
    );
  } catch (error) {
    throw error;
  }
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
  page: string = "1"
): Promise<{
  employer: EmployerTypes;
  totalJobs: number;
  totalReviews: number;
}> => {
  try {
    return await getApiHandler(
      `seeker/employers/${employerId}?page=${page}&type=${type}`,
      token
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the seeker's profile.
 * @param token - The authentication token.
 * @returns A promise resolving to the seeker profile.
 */
export const getSeekerProfile = async (
  token: string
): Promise<{ seeker: SeekerTypes }> => {
  try {
    return await getApiHandler(`seeker`, token);
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(`seeker/${employerId}/follow`, {}, token);
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(
      `seeker/edit-seeker-profile`,
      formData,
      token,
      "multipart/form-data"
    );
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(`seeker/add-new-education`, data, token);
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(`seeker/add-new-experience`, data, token);
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(`seeker/jobs/alerts`, formData, token);
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes the seeker's profile.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const deleteSeekerProfile = async (
  token: string
): Promise<ResponseMessageTypes> => {
  try {
    return await deleteApiHandler(`seeker/delete-seeker-profile`, token);
  } catch (error) {
    throw error;
  }
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
  try {
    return await deleteApiHandler(
      `seeker/delete-education/${educationId}`,
      token
    );
  } catch (error) {
    throw error;
  }
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
  try {
    return await deleteApiHandler(
      `seeker/delete-experience/${experienceId}`,
      token
    );
  } catch (error) {
    throw error;
  }
};
