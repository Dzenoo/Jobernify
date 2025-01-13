import sanitizeHtml from 'sanitize-html';

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
 * Sanitizes a given input string by removing unwanted HTML tags and attributes.
 * @param value - The string to be sanitized.
 * @param options - Optional configuration for allowed HTML tags and attributes.
 * @returns The sanitized string with disallowed tags and attributes removed.
 */
export function sanitizeInput(
  value: string,
  options?: sanitizeHtml.IOptions,
): string {
  if (typeof value !== 'string') {
    return value;
  }

  const defaultOptions: sanitizeHtml.IOptions = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
  };

  return sanitizeHtml(value, options || defaultOptions).trim();
}
