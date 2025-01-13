import * as sanitizeHtml from 'sanitize-html';

/**
 * Returns the redirect URL based on the user's role.
 *
 * @param role - The role of the user, either 'seeker' or 'employer'.
 * @returns The redirect URL corresponding to the user's role.
 */
export const getRedirectUrl = (role: 'seeker' | 'employer'): string => {
  const roledUrl = role === 'seeker' ? 'jobs' : 'seekers';

  const redirectUrl = `${process.env.FRONTEND_URL}/${roledUrl}`;

  return redirectUrl;
};

/**
 * Sanitizes a string by removing unwanted tags, attributes, etc.
 * Customize the 'allowedTags' and 'allowedAttributes' to your needs.
 */
export function sanitizeInput(
  value: string,
  options?: sanitizeHtml.IOptions,
): string {
  if (typeof value !== 'string') {
    return value; // If it's not a string, return as is
  }

  // Default sanitization: removes all tags
  const defaultOptions: sanitizeHtml.IOptions = {
    allowedTags: [], // No tags allowed
    allowedAttributes: {}, // No attributes allowed
    disallowedTagsMode: 'discard', // Remove disallowed tags
  };

  return sanitizeHtml(value, options || defaultOptions);
}
