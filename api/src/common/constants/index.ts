import { CookieOptions } from 'express';

/**
 * Constant defining the expiration time for verification tokens.
 * Value: 24 hours (in milliseconds)
 * Usage: Typically used for setting expiration durations in token-based authentication.
 */
export const VERIFICATION_TOKEN_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Regular expression for validating strong passwords.
 * Requirements:
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one numeric digit
 * - At least one special character (@, $, !, %, *, ?, &)
 * - Minimum length of 8 characters
 * Usage: Ensures passwords meet security requirements.
 */
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * Escapes special characters in a string to prepare it for use in a regular expression.
 * @param string The string to escape.
 * @returns The escaped string.
 */
export const escapeRegExp = (string: string): string => {
  // Escape special characters
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Options for the cookie that stores the JWT.
 * @property {boolean} httpOnly - The cookie will be set with the `httpOnly` flag.
 * @property {boolean} secure - The cookie will be set with the `secure` flag.
 * @property {string} sameSite - The cookie will be set with the `sameSite` flag.
 * @property {number} maxAge - The maximum age of the cookie in milliseconds.
 */
export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true, // Set to true in production
  sameSite: 'strict',
  maxAge: 3600000,
  path: '/',
  domain: '.jobernify.com',
};
