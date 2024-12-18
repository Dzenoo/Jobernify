'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { NavbarLandingLinks } from '@/constants';

import { useAuthentication } from '@/hooks/core/useAuthentication.hook';

import { Button } from '@/components/ui/button';

const NavbarLanding: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const { userType } = useAuthentication().getCookieHandler();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const isSeeker = userType === 'seeker';

  return (
    <header className="px-5 bg-[#03F7FF0D] py-5 flex justify-between items-center gap-5 md:px-28">
      <div>
        <Image
          src="/images/logo-light.png"
          alt="logo"
          width={150}
          height={150}
        />
      </div>
      <div
        className={`max-lg:hidden relative ${
          isSeeker ? 'right-10' : 'right-8'
        }`}
      >
        <ul className="flex items-center gap-10">
          {NavbarLandingLinks.map((link) => (
            <li key={link.id}>
              <a
                className="transition-all hover:text-blue-700"
                href={`#${link.href}`}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-stretch">
        {userType && isSeeker && (
          <div>
            <Link href="/jobs">
              <Button className="px-5" variant="outline">
                Jobs
              </Button>
            </Link>
          </div>
        )}
        {userType && !isSeeker && (
          <div>
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        )}
        {!userType && (
          <div>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarLanding;
