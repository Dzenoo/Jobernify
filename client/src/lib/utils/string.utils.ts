import DOMPurify from 'dompurify';

/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export const uppercaseFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncates text to a specified length.
 * @param text - The text to truncate.
 * @param length - The maximum length of the truncated text.
 * @returns The truncated text.
 */
export const truncate = (text: string, length: number): string => {
  return text?.length > length ? text.substring(0, length) + '...' : text;
};

/**
 * Sanitizes HTML content.
 * @param content - The content to sanitize
 * @returns The sanitized content
 */
export const sanitize = (content: string): string => {
  const sanitized = DOMPurify.sanitize(content);
  return sanitized;
};
