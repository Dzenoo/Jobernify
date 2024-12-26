'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { Button } from '@/components/ui/buttons/button';

const NavbarLanding: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { userType } = useAuthentication().getCookieHandler();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const isSeeker = userType === 'seeker';

  return (
    <header className="px-5 py-3 bg-white flex justify-between items-center gap-5 md:px-28">
      <div>
        <Link href="/">
          <Image
            src="/images/logo-light.png"
            alt="logo"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div className="flex items-stretch">
        {userType ? (
          isSeeker ? (
            <Link href="/jobs">
              <Button variant="outline">Jobs</Button>
            </Link>
          ) : (
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          )
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavbarLanding;
