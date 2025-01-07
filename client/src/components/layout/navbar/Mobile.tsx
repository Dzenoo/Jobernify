'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { SeekersNavbarLinks } from '@/constants';
import { useCurrentUser } from '@/hooks/queries/useCurrentUser.query';

import NavbarLinksList from './NavbarLinksList';

const MobileBar: React.FC = () => {
  const { data: currentUser } = useCurrentUser();
  const pathname = usePathname();

  const isSeeker = currentUser?.role === 'seeker';

  return (
    <div className="bg-white xl:hidden border-t border-gray-100 dark:bg-[#0d0d0d] p-6 sticky bottom-0 max-xl:flex dark:border-[#1b1b1b] items-center justify-center">
      <NavbarLinksList
        pathname={pathname}
        data={isSeeker ? SeekersNavbarLinks : []}
      />
    </div>
  );
};

export default MobileBar;
