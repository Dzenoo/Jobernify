import { NextResponse, NextRequest } from 'next/server';

import { decodeToken } from './lib/utils';

const protectedRoutes = {
  '/dashboard': ['employer'],
  '/seekers': ['employer'],
  '/dashboard/jobs': ['employer'],
  '/dashboard/jobs/new': ['employer'],
  '/dashboard/jobs/jobId/edit': ['employer'],
  '/dashboard/profile': ['employer'],
  '/jobs': ['seeker'],
  '/jobs/jobId': ['seeker'],
  '/employers': ['seeker'],
  '/employers/employerId': ['seeker'],
  '/profile': ['seeker'],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token');

  const userType = token ? decodeToken(token.value)?.role : null;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    return handleUnauthenticatedAccess(pathname, req);
  }

  if (isAuthPage(pathname)) {
    return redirectLoggedInUser(userType, req);
  }

  return handleProtectedRoutes(pathname, userType, req);
}

function handleUnauthenticatedAccess(pathname: string, req: NextRequest) {
  if (isAuthPage(pathname)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/login', req.url));
}

function isAuthPage(pathname: string) {
  return (
    pathname === '/login' ||
    pathname === '/login/2fa' ||
    pathname === '/signup' ||
    pathname === '/verify-email' ||
    pathname === '/check-your-email'
  );
}

function redirectLoggedInUser(userType: string, req: NextRequest) {
  const redirectUrl = userType === 'employer' ? '/dashboard' : '/jobs';
  return NextResponse.redirect(new URL(redirectUrl, req.url));
}

function handleProtectedRoutes(
  pathname: string,
  userType: string,
  req: NextRequest,
) {
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route) && !roles.includes(userType)) {
      const redirectUrl = userType === 'employer' ? '/seekers' : '/jobs';
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login/:path*',
    '/signup',
    '/verify-email',
    '/check-your-email',
    '/dashboard/:path*',
    '/seekers/:path*',
    '/profile',
    '/employers/:path*',
    '/jobs/:path*',
  ],
};
