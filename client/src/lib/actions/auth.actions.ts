import { getApiHandler, postApiHandler } from '../api';

/**
 * Logs in a user (seeker or employer).
 * @param params - An object containing the type of account and the login data (email and password).
 * @returns A message indicating the success of the login attempt
 */
export const signIn = async ({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}): Promise<
  { redirectUrl: string } & {
    twoFactorRequired: boolean;
    userId: string;
  }
> => {
  return await postApiHandler('auth/signin', data);
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
 * @param code The 2FA code to be verified.
 * @returns
 */
export const verify2FALogin = async (
  userId: string,
  code: string,
): Promise<{
  statusCode: number;
  redirectUrl: string;
}> => {
  return await postApiHandler(`auth/2fa/login-verify`, { userId, code });
};

/**
 * Generates a new 2FA code.
 * @returns A promise resolving to the generated 2FA code.
 */
export const generate2FACode = async (): Promise<{
  otpauthUrl: string;
}> => {
  return await postApiHandler(`2fa/generate`, {});
};

/**
 * Verifies a 2FA code.
 * @param code The 2FA code to be verified.
 * @returns A promise resolving to a success message.
 */
export const verify2FACode = async (
  code: string,
): Promise<{ message: string }> => {
  return await postApiHandler(`2fa/verify-setup`, { code });
};

/**
 * Logs out the current user.
 * Initiates a request to the server to invalidate the user's session.
 * @returns A promise resolving to the server response.
 */
export const logout = async (): Promise<any> => {
  return await postApiHandler('auth/logout', {});
};

export const getCurrentUser = async (): Promise<{ role: string }> => {
  return await getApiHandler('auth/me');
};
