import qs from 'qs';

import { deleteApiHandler, getApiHandler, patchApiHandler } from '../api';

import {
  Employer,
  GetEmployerByIdDto,
  GetEmployerProfileDto,
  GetEmployersDto,
} from '@/types';

/**
 * Fetches the employer profile along with job counts.
 * @param params - An object containing  page, sort, search, and type.
 * @returns A promise resolving to the employer profile and associated counts.
 */
export const getEmployerProfile = async (
  query: GetEmployerProfileDto,
): Promise<{
  counts: { totalJobs: number };
  employer: Employer;
}> => {
  const queryString = qs.stringify(query, { skipNulls: true });
  return await getApiHandler(`employers/profile?${queryString}`);
};

/**
 * Edits the employer profile with form data.
 * @param formData - The form data containing updated employer details.
 * @returns A promise resolving to a response message.
 */
export const editEmployerProfile = async (
  formData: FormData,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler('employers/edit-profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
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
 * @param sort - The sorting parameter.
 * @param search - The search query for filtering employers.
 * @returns A promise resolving to a list of employers and total employer count.
 */
export const getEmployers = async (
  query: GetEmployersDto,
): Promise<{ employers: Employer[]; totalEmployers: number }> => {
  const queryString = qs.stringify(query, { skipNulls: true });
  return await getApiHandler(`employers/all?${queryString}`);
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
  query: GetEmployerByIdDto,
): Promise<{
  employer: Employer;
  totalJobs: number;
}> => {
  const queryString = qs.stringify(query, { skipNulls: true });
  return await getApiHandler(`employers/${employerId}?${queryString}`);
};
