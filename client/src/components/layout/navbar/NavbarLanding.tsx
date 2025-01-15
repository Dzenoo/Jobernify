'use client';

import React from 'react';
import Link from 'next/link';

import Themes from './Themes';
import Logo from './Logo';

import { Button } from '@/components/ui/buttons/button';

const NavbarLanding: React.FC = () => {
  return (
    <header className="px-5 py-3 bg-white dark:bg-black flex justify-between items-center gap-5 border-b border-gray-100 dark:border-[#1b1b1b] md:px-28">
      <div>
        <Logo />
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
