import qs from 'qs';

import {
  getApiHandler,
  postApiHandler,
  patchApiHandler,
  deleteApiHandler,
} from '../api';

import { FilterCounts, GetJobsDto, IJob } from '@/types';

/**
 * Creates a new job.
 * @param formData - The form data containing job details.
 * @returns A promise resolving to a response message.
 */
export const createNewJob = async (
  formData: FormData,
): Promise<ServerResponse> => {
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
  formData: FormData,
): Promise<ServerResponse> => {
  return await patchApiHandler(`jobs/${jobId}/edit`, formData);
};

/**
 * Deletes a job by its ID.
 * @param jobId - The ID of the job to delete.
 * @returns A promise resolving to a response message.
 */
export const deleteJob = async (jobId: string): Promise<ServerResponse> => {
  return await deleteApiHandler(`jobs/${jobId}/delete`);
};

/**
 * Saves a job for the seeker.
 * @param jobId - The ID of the job to save.
 * @returns A promise resolving to a response message.
 */
export const saveJob = async (jobId: string): Promise<ServerResponse> => {
  return await postApiHandler(`jobs/${jobId}/save`, {});
};

/**
 * Fetches the list of jobs based on the specified filters.
 * @param params - An object containing page, sort order, search term, salary range, job type, seniority, and position.
 * @returns A promise resolving to a list of jobs, total number of jobs, and popular jobs.
 */
export const getJobs = async (
  query: GetJobsDto,
): Promise<{
  jobs: IJob[];
  totalJobs: number;
  popularJobs: IJob[];
  filterCounts: FilterCounts;
}> => {
  const queryString = qs.stringify(query, { skipNulls: true });
  return await getApiHandler(`jobs/all?${queryString}`);
};

/**
 * Fetches a specific job by its ID.
 * @param jobId - The ID of the job to retrieve.
 * @returns A promise resolving to the job details and related jobs.
 */
export const getJobById = async (
  jobId: string,
): Promise<{ job: IJob; jobs: IJob[] }> => {
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
