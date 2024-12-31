'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

const AuthenticationSuccessful = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { storeCookieHandler } = useAuthentication();
  const router = useRouter();

  // useEffect(() => {
  //   storeCookieHandler(searchParams?.token);
  //   router.replace(searchParams?.role === 'seeker' ? '/jobs' : '/seekers');
  // }, [searchParams, storeCookieHandler, router]);
};

export default AuthenticationSuccessful;
