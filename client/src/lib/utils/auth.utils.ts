import { jwtDecode } from 'jwt-decode';

import {
  EmployersNavbarActions,
  SeekersNavbarActions,
  SeekersNavbarLinks,
} from '@/constants';

/**
 * Decodes token of the user.
 * @param token - A token for decoding.
 * @returns An decoded token.
 */
export function decodeToken(token: string): any {
  return jwtDecode(token);
}

/**
 * Returns the role specific data.
 * @param isSeeker Boolean to check if the user is a seeker.
 * @param data Data of the user.
 * @returns The role specific data.
 */
export const getRoleSpecificData = (isSeeker: boolean, data: any) => {
  return {
    image: isSeeker ? data?.seeker?.image : data?.employer?.image,
    link: isSeeker ? '/profile' : '/dashboard/settings',
    actions: isSeeker ? SeekersNavbarActions : EmployersNavbarActions,
    links: isSeeker ? SeekersNavbarLinks : [],
    tooltip: isSeeker ? 'Profile' : 'Dashboard',
  };
};
