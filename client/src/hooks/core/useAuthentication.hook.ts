import React from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

type AuthData = {
  isAuthenticated: boolean;
  userType: string | null;
  token: string | null;
  userId: string | null;
};

const useAuthentication = () => {
  const getCookieHandler = React.useCallback((): AuthData => {
    const token = Cookies.get('access_token');

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

  return { getCookieHandler };
};

export { useAuthentication };
