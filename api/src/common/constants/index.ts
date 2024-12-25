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

export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
};
