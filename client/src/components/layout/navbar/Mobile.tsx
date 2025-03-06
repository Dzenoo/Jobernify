'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { SeekersNavbarLinks } from '@/constants';
import { useAuthStore } from '@/store/auth.store';

import NavbarLinksList from './NavbarLinksList';

const MobileBar: React.FC = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();

  const isSeeker = user === 'seeker';

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
