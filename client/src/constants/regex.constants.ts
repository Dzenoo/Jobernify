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
