import { deleteApiHandler, getApiHandler, patchApiHandler } from '../api';

import { Employer } from '@/types';

/**
 * Fetches the employer profile along with job counts.
 * @param params - An object containing  page, srt, search, and type.
 * @returns A promise resolving to the employer profile and associated counts.
 */
export const getEmployerProfile = async ({
  page = 1,
  srt = '',
  search = '',
  type = '',
}: {
  page?: number;
  srt?: string;
  search?: string;
  type?: string;
}): Promise<{
  counts: { totalJobs: number };
  employer: Employer;
}> => {
  return await getApiHandler(
    `employers/profile?type=${type}&page=${page}&sort=${srt}&search=${search}`,
  );
};

/**
 * Edits the employer profile with form data.
 * @param formData - The form data containing updated employer details.
 * @returns A promise resolving to a response message.
 */
export const editEmployerProfile = async (
  formData: FormData,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(
    'employers/edit-profile',
    formData,
    'multipart/form-data',
  );
};

/**
 * Deletes the employer profile.
 * @returns A promise resolving to a response message.
 */
export const deleteEmployerProfile =
  async (): Promise<ResponseMessageTypes> => {
    return await deleteApiHandler('employers/delete-profile');
  };

/**
 * Fetches the employer's analytics data.
 * @returns A promise resolving to various employer statistics.
 */
export const getEmployerAnalyticsInfo = async (): Promise<{
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
  return await getApiHandler('employers/analytics');
};

/**
 * Fetches a list of employers with pagination, sorting, and search filters.
 * @param page - The page number (default: "1").
 * @param srt - The sorting parameter.
 * @param search - The search query for filtering employers.
 * @returns A promise resolving to a list of employers and total employer count.
 */
export const getEmployers = async ({
  page = 1,
  sort = '',
  search = '',
  industry = '',
  size = '',
  location = '',
}: {
  page: number;
  sort: string;
  search: string;
  industry: string;
  size: string;
  location: string;
}): Promise<{ employers: Employer[]; totalEmployers: number }> => {
  return await getApiHandler(
    `employers/all?page=${page}&sort=${sort}&search=${search}&industry=${industry}&size=${size}&location=${location}`,
  );
};

/**
 * Fetches the details of a specific employer, including jobs and .
 * @param employerId - The ID of the employer.
 * @param type - The type of data to fetch (default: "").
 * @param page - The page number for paginated data (default: "1").
 * @returns A promise resolving to the employer details along with the total jobs and  count.
 */
export const getEmployerById = async (
  employerId: string,
  type: string = '',
  page: number = 1,
): Promise<{
  employer: Employer;
  totalJobs: number;
}> => {
  return await getApiHandler(
    `employers/${employerId}?page=${page}&limit=10&type=${type}`,
  );
};
