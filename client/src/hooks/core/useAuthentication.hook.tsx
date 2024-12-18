import React from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import { useRouter } from 'next/navigation';

type AuthData = {
  isAuthenticated: boolean;
  userType: string | null;
  token: string | null;
  userId: string | null;
};

const useAuthentication = () => {
  const router = useRouter();

  const storeCookieHandler = React.useCallback((token: string) => {
    Cookies.set('token', token, { expires: 1 / 24 });
  }, []);

  const deleteCookieHandler = React.useCallback(() => {
    Cookies.remove('token');
    router.push('/login');
  }, []);

  const getCookieHandler = React.useCallback((): AuthData => {
    const token = Cookies.get('token');

    if (!token) {
      return {
        isAuthenticated: false,
        userType: null,
        token: null,
        userId: null,
      };
    }

    try {
      const decoded: {
        email: string;
        sub: string;
        role: string;
        exp: number;
        iat: number;
      } = jwtDecode(token);

      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        Cookies.remove('token');
        return {
          isAuthenticated: false,
          userType: null,
          token: null,
          userId: null,
        };
      }

      return {
        isAuthenticated: true,
        userType: decoded.role,
        token,
        userId: decoded.sub,
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        userType: null,
        token: null,
        userId: null,
      };
    }
  }, []);

  return { deleteCookieHandler, storeCookieHandler, getCookieHandler };
};

export { useAuthentication };
