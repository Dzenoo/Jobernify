'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { getRoleSpecificData } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/queries/useCurrentUser.query';

import Logo from './Logo';
import NavbarLinksList from './NavbarLinksList';
import NavbarActionsList from './NavbarActionsList';

type NavbarProps = {
  href?: string;
};

const Navbar: React.FC<NavbarProps> = ({ href }) => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const pathname = usePathname();

  const isAuthenticated = currentUser?.role !== null;
  const isSeeker = currentUser?.role === 'seeker';
  const roleData = getRoleSpecificData(isSeeker);

  return (
    <header className="px-5 py-3 base-margin flex justify-between items-center gap-3 border-b border-gray-100 bg-white dark:bg-[#0d0d0d] dark:border-[#1b1b1b] overflow-hidden">
      <Logo href={href} />

      {isAuthenticated && !isLoading && (
        <div className="max-xl:hidden">
          <NavbarLinksList pathname={pathname} data={roleData.links} />
        </div>
      )}

      <div className="flex items-center gap-6">
        {isAuthenticated && !isLoading ? (
          <NavbarActionsList
            data={roleData.actions}
            pathname={pathname}
            isSeeker={isSeeker}
          />
        ) : (
          <div className="animate-pulse bg-gray-300 h-5 w-full rounded-xl" />
        )}
      </div>
    </header>
  );
};

export default Navbar;
