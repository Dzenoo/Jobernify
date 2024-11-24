import { EmployerTypes, ResponseMessageTypes, SeekerTypes } from "@/types";
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
  return await getApiHandler(
    `seekers/all?page=${page}&search=${search}&skills=${skills}`,
    token
  );
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
  return await deleteApiHandler("employers/delete-profile", token);
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
  return await getApiHandler(
    `employers/profile?type=${type}&page=${page}&sort=${srt}&search=${search}`,
    token
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
  token: string
): Promise<{ seeker: SeekerTypes }> => {
  return await getApiHandler(`seekers/${seekerId}`, token);
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
  return await patchApiHandler(
    "employers/edit-profile",
    formData,
    token,
    "multipart/form-data"
  );
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
  return await getApiHandler("employers/analytics", token);
};
