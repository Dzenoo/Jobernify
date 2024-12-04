import { deleteApiHandler, getApiHandler, patchApiHandler } from "../api";

import { EmployerTypes, ResponseMessageTypes } from "@/types";

/**
 * ===============================
 * Employer API Handlers
 * ===============================
 */

/**
 * Fetches the employer profile along with job counts.
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
  counts: { totalJobs: number };
  employer: EmployerTypes;
}> => {
  return await getApiHandler(
    `employers/profile?type=${type}&page=${page}&sort=${srt}&search=${search}`,
    token
  );
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
 * Fetches the employer's analytics data.
 * @param token - The authentication token for the employer.
 * @returns A promise resolving to various employer statistics.
 */
export const getEmployerAnalyticsInfo = async (
  token: string
): Promise<{
  totalJobs: number;
  totalApplications: number;
  totalFollowers: number;
  jobsPerMonth: number[];
  followersOverTime: number[];
  jobTypes: Record<string, number>;
  jobsThisMonth: number;
  applicationsThisMonth: number;
  followersThisMonth: number;
}> => {
  return await getApiHandler("employers/analytics", token);
};

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
  page: string;
  sort: string;
  search: string;
  token: string;
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
 * Fetches the details of a specific employer, including jobs and .
 * @param employerId - The ID of the employer.
 * @param token - The authentication token.
 * @param type - The type of data to fetch (default: "").
 * @param page - The page number for paginated data (default: "1").
 * @returns A promise resolving to the employer details along with the total jobs and  count.
 */
export const getEmployerById = async (
  employerId: string,
  token: string,
  type: string = "",
  page: number = 1
): Promise<{
  employer: EmployerTypes;
  totalJobs: number;
}> => {
  return await getApiHandler(
    `employers/${employerId}?page=${page}&limit=10&type=${type}`,
    token
  );
};
