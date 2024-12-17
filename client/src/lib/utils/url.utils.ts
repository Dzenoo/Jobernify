import { AWS_URL } from '@/constants';

/**
 * Generates a full image URL for a given image path.
 * @param image - The image path or URL.
 * @returns The full image URL.
 */
export const getImageUrl = (image: string): string => {
  return image?.includes('https:') ? image : `${AWS_URL}/${image}`;
};

/**
 * Formats a URL to include the protocol if missing.
 * @param url - The URL string to format.
 * @returns The formatted URL with protocol.
 */
export const formatURL = (url: string): string => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};
