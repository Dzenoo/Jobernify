import { getApiHandler, patchApiHandler, postApiHandler } from '../api';

import { Application } from '@/types';

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
  status: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(
    `applications/${applicationId}/status`,
    { status },
    token,
  );
};

/**
 * Fetches applications for a specific job.
 * @param params - An object containing token, job ID, application type, and page.
 * @returns A promise resolving to the job, applications, and their statuses.
 */
export const getApplications = async ({
  token,
  jobId,
  status = '',
  page = 1,
}: {
  token: string;
  jobId: string;
  status: string;
  page: number;
}): Promise<{
  job: string;
  applications: Application[];
  totalApplications: number;
  totalPendingStatus: number;
  totalInterviewStatus: number;
  totalRejectedStatus: number;
  totalAcceptedStatus: number;
}> => {
  return await getApiHandler(
    `applications/${jobId}?page=${page}&limit=10&status=${status}`,
    token,
  );
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
  formData: FormData,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(
    `applications/${jobId}/apply`,
    formData,
    token,
    'multipart/form-data',
  );
};
