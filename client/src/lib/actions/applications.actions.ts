import { getApiHandler, patchApiHandler, postApiHandler } from '../api';

import { Application } from '@/types';

/**
 * Updates the status of a specific job application.
 * @param applicationId - The ID of the application.
 * @param status - The new status of the application.
 * @returns A promise resolving to a response message.
 */
export const updateApplicationStatus = async (
  applicationId: string,
  status: string,
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`applications/${applicationId}/status`, {
    status,
  });
};

/**
 * Fetches applications for a specific job.
 * @param params - An object containing job ID, application type, and page.
 * @returns A promise resolving to the job, applications, and their statuses.
 */
export const getApplications = async ({
  jobId,
  status = '',
  page = 1,
}: {
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
  );
};

/**
 * Applies to a job with form data.
 * @param jobId - The ID of the job to apply to.
 * @param formData - The form data containing application details.
 * @returns A promise resolving to a response message.
 */
export const applyToJob = async (
  jobId: string,
  formData: FormData,
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(
    `applications/${jobId}/apply`,
    formData,
    'multipart/form-data',
  );
};
