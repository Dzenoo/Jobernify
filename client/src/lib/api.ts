import axios from 'axios';

type AxiosHeadersConfig = {
  [key: string]: string;
};

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Handles POST API requests.
 * @param url - The API endpoint to post to.
 * @param data - The data to be sent in the request body.
 * @param contentType - The content type of the request (default: "application/json").
 * @returns A promise resolving to the response data.
 */
export const postApiHandler = <T>(
  url: string,
  data: {} | FormData,
  contentType: string = 'application/json',
): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    'Content-Type': contentType,
  };

  return axios
    .post(`${DEFAULT_API_URL}/${url}`, data, { headers, withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

/**
 * Handles PATCH API requests.
 * @param url - The API endpoint to patch to.
 * @param data - The data to be sent in the request body.
 * @param contentType - The content type of the request (default: "application/json").
 * @returns A promise resolving to the response data.
 */
export const patchApiHandler = <T>(
  url: string,
  data: {} | FormData,
  contentType: string = 'application/json',
): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    'Content-Type': contentType,
  };

  return axios
    .patch(`${DEFAULT_API_URL}/${url}`, data, {
      headers,
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

/**
 * Handles DELETE API requests.
 * @param url - The API endpoint to delete from.
 * @returns A promise resolving to the response data.
 */
export const deleteApiHandler = <T>(url: string): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    'Content-Type': 'application/json',
  };

  return axios
    .delete(`${DEFAULT_API_URL}/${url}`, { headers, withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

/**
 * Handles GET API requests.
 * @param url - The API endpoint to get data from.
 * @returns A promise resolving to the response data.
 */
export const getApiHandler = <T>(url: string): Promise<T> => {
  const headers: AxiosHeadersConfig = {
    'Content-Type': 'application/json',
  };

  return axios
    .get(`${DEFAULT_API_URL}/${url}`, { headers, withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
