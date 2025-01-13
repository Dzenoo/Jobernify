'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/buttons/button';

const NavbarLanding: React.FC = () => {
  return (
    <header className="px-5 py-3 bg-black flex justify-between items-center gap-5 border-b border-[#1b1b1b] md:px-28">
      <div>
        <Link href="/">
          <Image
            src="/images/logo-dark.png"
            alt="logo"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div className="flex items-stretch">
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
