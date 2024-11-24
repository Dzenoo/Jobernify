import { ResponseMessageTypes, ReviewTime, ReviewType } from "@/types";
import { deleteApiHandler, patchApiHandler, postApiHandler } from "../api";

/**
 * ===============================
 * Review API Handlers
 * ===============================
 */

/**
 * Submits a review for an employer.
 * @param employerId - The ID of the employer being reviewed.
 * @param token - The authentication token.
 * @param formData - An object containing the review details such as positive and negative reviews, job position, and type of review.
 * @returns A promise resolving to a response message.
 */
export const reviewEmployer = async (
  employerId: string,
  token: string,
  formData: {
    positive_review: string;
    negative_review: string;
    technologies: string[];
    job_position: string;
    type: keyof typeof ReviewType;
    time: keyof typeof ReviewTime;
  }
): Promise<ResponseMessageTypes> => {
  return await postApiHandler(`reviews/${employerId}`, formData, token);
};

/**
 * Edits an existing review for an employer.
 * @param employerId - The ID of the employer whose review is being edited.
 * @param token - The authentication token.
 * @param formData - An object containing updated review details and the review ID.
 * @returns A promise resolving to a response message.
 */
export const editReview = async (
  employerId: string,
  token: string,
  formData: {
    positive_review: string;
    negative_review: string;
    job_position: string;
    reviewId: string;
  }
): Promise<ResponseMessageTypes> => {
  return await patchApiHandler(`reviews/${employerId}`, formData, token);
};

/**
 * Deletes a review for an employer.
 * @param employerId - The ID of the employer whose review is being deleted.
 * @param token - The authentication token.
 * @returns A promise resolving to a response message.
 */
export const deleteReview = async (
  employerId: string,
  token: string
): Promise<ResponseMessageTypes> => {
  return await deleteApiHandler(`reviews/${employerId}`, token);
};
