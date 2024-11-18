import {
  EmployerTypes,
  JobTypes,
  ResponseMessageTypes,
  SeekerTypes,
} from "@/types";
import { deleteApiHandler, getApiHandler, patchApiHandler } from "../api";

/**
 * ===============================
 * Employer API Handlers
 * ===============================
 */

/**
 * Fetches a list of seekers based on search query and skills.
 * @param params - An object containing token, page, skills, and search term.
 * @returns A promise resolving to the list of seekers and total count.
 */
export const getSeekers = async ({
  token,
  page = "1",
  search = "",
  skills = "",
}: {
  token: string;
  page?: string;
  skills?: string | string[];
  search?: string;
}): Promise<{ seekers: SeekerTypes[]; totalSeekers: number }> => {
  try {
    return await getApiHandler(
      `employer/seekers?page=${page}&search=${search}&skills=${skills}`,
      token
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes the employer profile.
 * @param token - The authentication token for the employer.
 * @returns A promise resolving to a response message.
 */
export const deleteEmployerProfile = async ({
  token,
}: {
  token: string;
}): Promise<ResponseMessageTypes> => {
  try {
    return await deleteApiHandler("employer/delete-employer-profile", token);
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the employer profile along with job and review counts.
 * @param params - An object containing token, page, srt, search, and type.
 * @returns A promise resolving to the employer profile and associated counts.
 */
export const getEmployerProfile = async ({
  token,
  page = "1",
  srt = "",
  search = "",
  type = "",
}: {
  token: string;
  page?: string;
  srt?: string;
  search?: string;
  type?: string;
}): Promise<{
  counts: { totalJobs: number; totalReviews: number };
  employer: EmployerTypes;
}> => {
  try {
    return await getApiHandler(
      `employer?type=${type}&page=${page}&srt=${srt}&search=${search}`,
      token
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a seeker by their ID.
 * @param seekerId - The ID of the seeker.
 * @param token - The authentication token for the employer.
 * @returns A promise resolving to the seeker's details.
 */
export const getSeekerById = async (
  seekerId: string,
  token: string
): Promise<{ seeker: SeekerTypes }> => {
  try {
    return await getApiHandler(`employer/seekers/${seekerId}`, token);
  } catch (error) {
    throw error;
  }
};

/**
 * Edits the employer profile with form data.
 * @param formData - The form data containing updated employer details.
 * @param token - The authentication token for the employer.
 * @returns A promise resolving to a response message.
 */
export const editEmployerProfile = async (
  formData: FormData,
  token: string
): Promise<ResponseMessageTypes> => {
  try {
    return await patchApiHandler(
      "employer/edit-employer-profile",
      formData,
      token,
      "multipart/form-data"
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches the employer's analytics data.
 * @param token - The authentication token for the employer.
 * @returns A promise resolving to various employer statistics.
 */
export const getEmployerAnalytics = async (
  token: string
): Promise<{
  totalJobs: number;
  totalReviews: number;
  totalApplications: number;
  totalFollowers: number;
  jobsPerMonth: number[];
  followersOverTime: number[];
  jobTypes: Record<string, number>;
  jobsThisMonth: number;
  reviewsThisMonth: number;
  applicationsThisMonth: number;
  followersThisMonth: number;
}> => {
  try {
    return await getApiHandler("employer/analytics", token);
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches a specific job by its ID.
 * @param token - The authentication token for the employer.
 * @param jobId - The ID of the job.
 * @returns A promise resolving to the job details.
 */
export const getJob = async (
  token: string,
  jobId: string
): Promise<{ job: JobTypes }> => {
  try {
    return await getApiHandler(`employer/jobs/${jobId}`, token);
  } catch (error) {
    throw error;
  }
};
