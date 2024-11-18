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
  srt = "",
  search = "",
  salaryRange = "",
  type = "",
  seniority = "",
  position = "",
}: {
  token: string;
  page?: string;
  srt?: string;
  search?: string;
  salaryRange?: string | string[];
  type?: string | string[];
  seniority?: string | string[];
  position?: string | string[];
}): Promise<{
  jobs: JobTypes[];
  totalJobs: number;
  popularJobs: JobTypes[];
  filterCounts: FilterCounts;
}> => {
  try {
    return await getApiHandler(
      `seeker/jobs?page=${page}&srt=${srt}&search=${search}&salaryRange=${salaryRange}&position=${position}&seniority=${seniority}&type=${type}`,
      token
    );
  } catch (error) {
    throw error;
  }
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
  try {
    return await getApiHandler(`seeker/jobs/${jobId}`, token);
  } catch (error) {
    throw error;
  }
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
  try {
    return await postApiHandler(
      `employer/jobs/create-new-job`,
      formData,
      token
    );
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(
      `employer/jobs/${jobId}/edit`,
      formData,
      token
    );
  } catch (error) {
    throw error;
  }
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
  try {
    return await postApiHandler(
      `seeker/jobs/${jobId}/apply`,
      formData,
      token,
      "multipart/form-data"
    );
  } catch (error) {
    throw error;
  }
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
  try {
    return await postApiHandler(
      `seeker/${jobId}/generate-cover-letter`,
      {},
      token
    );
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(`seeker/jobs/${jobId}/save`, {}, token);
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(`seeker/jobs/alerts`, data, token);
  } catch (error) {
    throw error;
  }
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
  try {
    return await deleteApiHandler(`employer/jobs/${jobId}/delete`, token);
  } catch (error) {
    throw error;
  }
};

/**
 * Fetches applications for a specific job.
 * @param params - An object containing token, job ID, application type, and page.
 * @returns A promise resolving to the job, applications, and their statuses.
 */
export const getApplications = async ({
  token,
  jobId,
  type = "",
  page = "1",
}: {
  token: string;
  jobId: string;
  type?: string;
  page?: string;
}): Promise<{
  job: JobTypes;
  applications: ApplicationsTypes[];
  totalApplications: number;
  totalPendingStatus: number;
  totalInterviewStatus: number;
  totalRejectedStatus: number;
  totalAcceptedStatus: number;
}> => {
  try {
    return await getApiHandler(
      `employer/applications/${jobId}?page=${page}&type=${type}`,
      token
    );
  } catch (error) {
    throw error;
  }
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
  try {
    return await patchApiHandler(
      `employer/${applicationId}/status`,
      { status },
      token
    );
  } catch (error) {
    throw error;
  }
};
