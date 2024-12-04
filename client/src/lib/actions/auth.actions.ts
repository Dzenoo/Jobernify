import { postApiHandler } from "../api";

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
  return await postApiHandler("auth/signin", loginData);
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
  return await postApiHandler("auth/seekers-signup", data);
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
  return await postApiHandler("auth/employers-signup", data);
};
