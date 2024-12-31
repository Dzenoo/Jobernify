'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { useFetchProfile } from '@/hooks/queries/useFetchProfile.query';
import { getRoleSpecificData } from '@/lib/utils';

import Logo from './Logo';
import NavbarLinksList from './NavbarLinksList';
import NavbarActionsList from './NavbarActionsList';
import NavbarAvatar from './NavbarAvatar';

type NavbarProps = {
  href?: string;
};

const userType = 'seeker';
const isAuthenticated = true;

const Navbar: React.FC<NavbarProps> = ({ href }) => {
  const { data: profileData, isLoading } = useFetchProfile(userType);
  const pathname = usePathname();

  const isSeeker = userType === 'seeker';
  const roleData = getRoleSpecificData(isSeeker, profileData);

  return (
    <header className="px-5 py-3 base-margin flex justify-between items-center gap-3 border-b border-gray-100 bg-white dark:bg-[#0d0d0d] dark:border-[#1b1b1b]">
      <Logo href={href} />

      {isAuthenticated && !isLoading && (
        <div className="max-xl:hidden">
          <NavbarLinksList pathname={pathname} data={roleData.links} />
        </div>
      )}

      <div className="flex items-center gap-6">
        {isAuthenticated && !isLoading ? (
          <>
            <NavbarActionsList
              data={roleData.actions}
              pathname={pathname}
              isSeeker={isSeeker}
            />
            <NavbarAvatar
              href={roleData.link}
              tooltip={roleData.tooltip}
              imageUrl={roleData.image}
            />
          </>
        ) : (
          <div className="animate-pulse bg-gray-300 h-5 w-full rounded-xl" />
        )}
      </div>
    </header>
  );
};

export default Navbar;
