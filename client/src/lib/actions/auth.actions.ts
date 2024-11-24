import { EmployerTypes, SeekerTypes, TypeOfAccount } from "@/types";
import { postApiHandler } from "../api";

/**
 * ===============================
 * Auth API Handlers
 * ===============================
 */

/**
 * Registers a new seeker account.
 * @param data - An object containing seeker details (first name, last name, email, password).
 * @returns A promise resolving to the new seeker and the authentication token.
 */
export const signupSeeker = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}): Promise<{ seeker: SeekerTypes; seekerToken: string }> => {
  try {
    return await postApiHandler("seeker-signup", data);
  } catch (error) {
    throw error; // Rethrow the error for handling at the call site
  }
};

/**
 * Registers a new employer account.
 * @param data - An object containing employer details (number, name, email, password, industry, size, address).
 * @returns A promise resolving to the new employer and the authentication token.
 */
export const signupEmployer = async (data: {
  name: string;
  email: string;
  password: string;
  industry: string;
  size: string;
  address: string;
}): Promise<{ employer: EmployerTypes; employerToken: string }> => {
  try {
    return await postApiHandler("employer-signup", data);
  } catch (error) {
    throw error; // Rethrow the error for handling at the call site
  }
};

/**
 * Logs in a user (seeker or employer) based on the account type.
 * @param params - An object containing the type of account and the login data (email and password).
 * @returns A promise resolving to the user (seeker or employer) and the authentication token.
 */
export const loginUserAccount = async ({
  type,
  loginData,
}: {
  type: TypeOfAccount;
  loginData: {
    email: string;
    password: string;
  };
}): Promise<
  { seeker: SeekerTypes; token: string } & {
    employer: EmployerTypes;
    token: string;
  }
> => {
  try {
    const endpoint = type === "employer" ? "employer-login" : "seeker-login";
    return await postApiHandler(endpoint, loginData);
  } catch (error) {
    throw error; // Rethrow the error for handling at the call site
  }
};
