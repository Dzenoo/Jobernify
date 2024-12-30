import {
  getApiHandler,
  postApiHandler,
  patchApiHandler,
  deleteApiHandler,
} from '../api';

import { FilterCounts, Job } from '@/types';

/**
 * Creates a new job.
 * @param token - The authentication token.
 * @param formData - The form data containing job details.
 * @returns A promise resolving to a response message.
 */
export const createNewJob = async (
  token: string,
  formData: any,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`jobs/create-new-job`, formData, token);
};

/**
 * Edits a job by its ID.
 * @param token - The authentication token.
 * @param jobId - The ID of the job to edit.
 * @param formData - The form data containing updated job details.
 * @returns A promise resolving to a response message.
 */
export const editJob = async (
  token: string,
  jobId: string,
  formData: any,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`jobs/${jobId}/edit`, formData, token);
};

/**
 * Deletes a job by its ID.
 * @param token - The authentication token.
 * @param jobId - The ID of the job to delete.
 * @returns A promise resolving to a response message.
 */
export const deleteJob = async (
  token: string,
  jobId: string,
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`jobs/${jobId}/delete`, token);
};

/**
 * Saves a job for the seeker.
 * @param jobId - The ID of the job to save.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const saveJob = async (
  jobId: string,
  token: string,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`jobs/${jobId}/save`, {}, token);
};

/**
 * Fetches the list of jobs based on the specified filters.
 * @param params - An object containing token, page, sort order, search term, salary range, job type, seniority, and position.
 * @returns A promise resolving to a list of jobs, total number of jobs, and popular jobs.
 */
export const getJobs = async ({
  token,
  page = 1,
  limit = 10,
  sort = '',
  search = '',
  salary = '',
  type = '',
  level = '',
  position = '',
}: {
  token: string;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  salary?: string;
  type?: string;
  level?: string;
  position?: string;
}): Promise<{
  jobs: Job[];
  totalJobs: number;
  popularJobs: Job[];
  filterCounts: FilterCounts;
}> => {
  return await getApiHandler(
    `jobs/all?page=${page}&limit=${limit}&sort=${sort}&search=${search}&salary=${salary}&position=${position}&level=${level}&type=${type}`,
    token,
  );
};

/**
 * Fetches a specific job by its ID.
 * @param jobId - The ID of the job to retrieve.
 * @param token - The authentication token.
 * @returns A promise resolving to the job details and related jobs.
 */
export const getJobById = async (
  jobId: string,
  token: string,
): Promise<{ job: Job; jobs: Job[] }> => {
  return await getApiHandler(`jobs/${jobId}`, token);
};

/**
 * Generates a cover letter for a job
 * @param jobId The ID of the job to generate a cover letter for
 * @param token The authentication token
 * @returns A promise resolving to the generated cover letter
 */
export const generateCoverLetter = async (
  jobId: string,
  token: string,
): Promise<{ coverLetter: string }> => {
  return await postApiHandler(`jobs/${jobId}/generate-cover-letter`, {}, token);
};
