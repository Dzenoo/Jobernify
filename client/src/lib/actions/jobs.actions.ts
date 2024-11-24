import {
  ApplicationsTypes,
  FilterCounts,
  JobTypes,
  ResponseMessageTypes,
} from "@/types";
import {
  deleteApiHandler,
  getApiHandler,
  patchApiHandler,
  postApiHandler,
} from "../api";

/**
 * ===============================
 * Job API Handlers
 * ===============================
 */

/**
 * Fetches the list of jobs based on the specified filters.
 * @param params - An object containing token, page, sort order, search term, salary range, job type, seniority, and position.
 * @returns A promise resolving to a list of jobs, total number of jobs, and popular jobs.
 */
export const getJobs = async ({
  token,
  page = "1",
  sort = "",
  search = "",
  salary = "",
  type = "",
  level = "",
  position = "",
}: {
  token: string;
  page?: string;
  sort?: string;
  search?: string;
  salary?: string;
  type?: string;
  level?: string;
  position?: string;
}): Promise<{
  jobs: JobTypes[];
  totalJobs: number;
  popularJobs: JobTypes[];
  filterCounts: FilterCounts;
}> => {
  return await getApiHandler(
    `jobs/all?page=${page}&sort=${sort}&search=${search}&salary=${salary}&position=${position}&level=${level}&type=${type}`,
    token
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
  token: string
): Promise<{ job: JobTypes; jobs: JobTypes[] }> => {
  return await getApiHandler(`jobs/${jobId}`, token);
};

/**
 * Creates a new job.
 * @param token - The authentication token.
 * @param formData - The form data containing job details.
 * @returns A promise resolving to a response message.
 */
export const createNewJob = async (
  token: string,
  formData: any
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
  formData: any
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`jobs/${jobId}/edit`, formData, token);
};

/**
 * Applies to a job with form data.
 * @param jobId - The ID of the job to apply to.
 * @param token - The authentication token.
 * @param formData - The form data containing application details.
 * @returns A promise resolving to a response message.
 */
export const applyToJob = async (
  jobId: string,
  token: string,
  formData: FormData
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(
    `applications/${jobId}/apply`,
    formData,
    token,
    "multipart/form-data"
  );
};

/**
 * Generates a cover letter for a specific job.
 * @param jobId - The ID of the job.
 * @param token - The authentication token.
 * @returns A promise resolving to the generated cover letter.
 */
export const addCoverLetter = async (
  jobId: string,
  token: string
): Promise<{ cover_letter: string }> => {
  return await postApiHandler(
    `seekers/${jobId}/generate-cover-letter`,
    {},
    token
  );
};

/**
 * Saves a job for the seeker.
 * @param jobId - The ID of the job to save.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const saveJob = async (
  jobId: string,
  token: string
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`jobs/${jobId}/save`, {}, token);
};

/**
 * Adds a job alert for the seeker.
 * @param token - The authentication token.
 * @param data - The data containing alert preferences.
 * @returns A promise resolving to a response message.
 */
export const addJobAlert = async (
  token: string,
  data: any
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`seekers/jobs/alerts`, data, token);
};

/**
 * Deletes a job by its ID.
 * @param token - The authentication token.
 * @param jobId - The ID of the job to delete.
 * @returns A promise resolving to a response message.
 */
export const deleteJob = async (
  token: string,
  jobId: string
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`jobs/${jobId}/delete`, token);
};

/**
 * Fetches applications for a specific job.
 * @param params - An object containing token, job ID, application type, and page.
 * @returns A promise resolving to the job, applications, and their statuses.
 */
export const getApplications = async ({
  token,
  jobId,
  status = "",
  page = 1,
}: {
  token: string;
  jobId: string;
  status: string;
  page: number;
}): Promise<{
  job: string;
  applications: ApplicationsTypes[];
  totalApplications: number;
  totalPendingStatus: number;
  totalInterviewStatus: number;
  totalRejectedStatus: number;
  totalAcceptedStatus: number;
}> => {
  return await getApiHandler(
    `applications/${jobId}?page=${page}&limit=10&status=${status}`,
    token
  );
};

/**
 * Updates the status of a specific job application.
 * @param applicationId - The ID of the application.
 * @param token - The authentication token.
 * @param status - The new status of the application.
 * @returns A promise resolving to a response message.
 */
export const updateApplicationStatus = async (
  applicationId: string,
  token: string,
  status: string
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(
    `applications/${applicationId}/status`,
    { status },
    token
  );
};
