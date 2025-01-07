import {
  getApiHandler,
  postApiHandler,
  patchApiHandler,
  deleteApiHandler,
} from '../api';

import { FilterCounts, Job } from '@/types';

/**
 * Creates a new job.
 * @param formData - The form data containing job details.
 * @returns A promise resolving to a response message.
 */
export const createNewJob = async (
  formData: any,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`jobs/create-new-job`, formData);
};

/**
 * Edits a job by its ID.
 * @param jobId - The ID of the job to edit.
 * @param formData - The form data containing updated job details.
 * @returns A promise resolving to a response message.
 */
export const editJob = async (
  jobId: string,
  formData: any,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`jobs/${jobId}/edit`, formData);
};

/**
 * Deletes a job by its ID.
 * @param jobId - The ID of the job to delete.
 * @returns A promise resolving to a response message.
 */
export const deleteJob = async (
  jobId: string,
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`jobs/${jobId}/delete`);
};

/**
 * Saves a job for the seeker.
 * @param jobId - The ID of the job to save.
 * @returns A promise resolving to a response message.
 */
export const saveJob = async (jobId: string): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`jobs/${jobId}/save`, {});
};

/**
 * Fetches the list of jobs based on the specified filters.
 * @param params - An object containing page, sort order, search term, salary range, job type, seniority, and position.
 * @returns A promise resolving to a list of jobs, total number of jobs, and popular jobs.
 */
export const getJobs = async ({
  page = 1,
  limit = 10,
  sort = '',
  search = '',
  salary = '',
  type = '',
  level = '',
  position = '',
}: {
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
  );
};

/**
 * Fetches a specific job by its ID.
 * @param jobId - The ID of the job to retrieve.
 * @returns A promise resolving to the job details and related jobs.
 */
export const getJobById = async (
  jobId: string,
): Promise<{ job: Job; jobs: Job[] }> => {
  return await getApiHandler(`jobs/${jobId}`);
};

/**
 * Generates a cover letter for a job
 * @param jobId The ID of the job to generate a cover letter for
 * @returns A promise resolving to the generated cover letter
 */
export const generateCoverLetter = async (
  jobId: string,
): Promise<{ coverLetter: string }> => {
  return await postApiHandler(`jobs/${jobId}/generate-cover-letter`, {});
};
