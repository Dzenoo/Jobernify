'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import Themes from './Themes';

import { Button } from '@/components/ui/buttons/button';
import { useMounted } from '@/hooks/core/useMounted.hook';

const NavbarLanding: React.FC = () => {
  const { isMounted } = useMounted();
  const { theme } = useTheme();

  if (!isMounted) return null;

  return (
    <header className="px-5 py-3 bg-white dark:bg-black flex justify-between items-center gap-5 border-b border-gray-100 dark:border-[#1b1b1b] md:px-28">
      <div>
        <Link href="/">
          <Image
            src={`/images/logo-${theme === 'dark' ? 'dark' : 'light'}.png`}
            alt="logo"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div className="flex gap-5 items-stretch">
        <Themes />
        <Link href="/login">
          <Button variant="outline" className="font-medium">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default NavbarLanding;
