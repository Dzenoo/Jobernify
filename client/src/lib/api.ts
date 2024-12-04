import axios from "axios";

// ===============================
// Types
// ===============================
type AxiosHeadersConfig = {
  [key: string]: string;
};

// ===============================
// Constants
// ===============================
const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL;

// ===============================
// API Handlers
// ===============================

/**
 * Handles POST API requests.
 * @param url - The API endpoint to post to.
 * @param data - The data to be sent in the request body.
 * @param token - Optional authorization token.
 * @param contentType - The content type of the request (default: "application/json").
 * @returns A promise resolving to the response data.
 */
export const postApiHandler = <T>(
  url: string,
  data: {} | FormData,
  token?: string,
  contentType: string = "application/json"
): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    "Content-Type": contentType,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios
    .post(`${DEFAULT_API_URL}/${url}`, data, { headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

/**
 * Handles PATCH API requests.
 * @param url - The API endpoint to patch to.
 * @param data - The data to be sent in the request body.
 * @param token - Optional authorization token.
 * @param contentType - The content type of the request (default: "application/json").
 * @returns A promise resolving to the response data.
 */
export const patchApiHandler = <T>(
  url: string,
  data: {} | FormData,
  token?: string,
  contentType: string = "application/json"
): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    "Content-Type": contentType,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios
    .patch(`${DEFAULT_API_URL}/${url}`, data, { headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

/**
 * Handles DELETE API requests.
 * @param url - The API endpoint to delete from.
 * @param token - Optional authorization token.
 * @returns A promise resolving to the response data.
 */
export const deleteApiHandler = <T>(
  url: string,
  token?: string
): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios
    .delete(`${DEFAULT_API_URL}/${url}`, { headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

/**
 * Handles GET API requests.
 * @param url - The API endpoint to get data from.
 * @param token - Optional authorization token.
 * @returns A promise resolving to the response data.
 */
export const getApiHandler = <T>(url: string, token?: string): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios
    .get(`${DEFAULT_API_URL}/${url}`, { headers })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
