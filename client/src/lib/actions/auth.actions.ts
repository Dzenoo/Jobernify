import { postApiHandler } from '../api';

/**
 * Logs in a user (seeker or employer).
 * @param params - An object containing the type of account and the login data (email and password).
 * @returns A promise resolving to the user (seeker or employer) and the authentication token.
 */
export const signIn = async ({
  loginData,
}: {
  loginData: {
    email: string;
    password: string;
  };
}): Promise<{ access_token: string; role: string }> => {
  return await postApiHandler('auth/signin', loginData);
};

/**
 * Registers a new seeker account.
 * @param data - An object containing seeker details (first name, last name, email, password).
 * @returns A promise resolving to success signup
 */
export const signupSeeker = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  return await postApiHandler('auth/seekers-signup', data);
};

/**
 * Registers a new employer account.
 * @param data - An object containing employer details (number, name, email, password, industry, size, address).
 * @returns A promise resolving to success signup
 */
export const signupEmployer = async (data: {
  name: string;
  email: string;
  password: string;
  industry: string;
  size: string;
  address: string;
}) => {
  return await postApiHandler('auth/employers-signup', data);
};

/**
 * Verifies the 2FA code for a user.
 * @param userId The ID of the user to verify the 2FA code for.
 * @param role The role of the user (seeker or employer).
 * @param code The 2FA code to be verified.
 * @returns A promise resolving to the authentication token and the role of the user.
 */
export const verify2FALogin = async (
  userId: string,
  role: string,
  code: string,
): Promise<{ access_token: string; role: string }> => {
  return await postApiHandler(`auth/2fa/login-verify`, { userId, role, code });
};

/**
 * Generates a new 2FA code.
 * @param role The role of the user (seeker or employer).
 * @param token The authentication token.
 * @returns A promise resolving to the generated 2FA code.
 */
export const generate2FACode = async (
  role: string,
  token: string,
): Promise<{
  otpauthUrl: string;
}> => {
  return await postApiHandler(`2fa/generate?role=${role}`, {}, token);
};

/**
 * Verifies a 2FA code.
 * @param role The role of the user (seeker or employer).
 * @param token The authentication token.
 * @param code The 2FA code to be verified.
 * @returns A promise resolving to a success message.
 */
export const verify2FACode = async (
  role: string,
  token: string,
  code: string,
): Promise<{ message: string }> => {
  return await postApiHandler(`2fa/verify-setup?role=${role}`, { code }, token);
};
