'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScaleLoader } from 'react-spinners';

import { getImageUrl } from '@/lib/utils';
import { useAuthentication } from '@/hooks/core/useAuthentication.hook';
import { useFetchProfile } from '@/hooks/queries/useFetchProfile.query';
import {
  EmployersNavbarActions,
  SeekersNavbarActions,
  SeekersNavbarLinks,
} from '@/constants';

import Logo from './Logo';
import NavbarActionsList from './NavbarActionsList';
import NavbarLinksList from './NavbarLinksList';

import { TooltipWrapper } from '@/components/ui/info/tooltip-wrapper';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/utilities/avatar';

const Navbar: React.FC<{ href?: string }> = ({ href }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const pathname = usePathname();

  const { deleteCookieHandler, getCookieHandler } = useAuthentication();
  const { isAuthenticated, userType, token } = getCookieHandler();

  const { data } = useFetchProfile(userType, token);
  const fetchedProfile: any = data;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isSeeker = userType === 'seeker';

  return (
    <header className="px-5 py-2 dark:bg-[#0d0d0d] base-margin flex justify-between items-center gap-3 overflow-hidden border-b border-gray-100 dark:border-[#1b1b1b] bg-white">
      <Logo href={href} />
      {isAuthenticated && (
        <div className="max-xl:hidden">
          <NavbarLinksList
            pathname={pathname}
            data={isSeeker ? SeekersNavbarLinks : []}
          />
        </div>
      )}
      <div className="flex items-center gap-6">
        {isAuthenticated && (
          <>
            <NavbarActionsList
              isSeeker={isSeeker}
              pathname={pathname}
              logout={deleteCookieHandler}
              data={isSeeker ? SeekersNavbarActions : EmployersNavbarActions}
            />
            <TooltipWrapper tooltip={isSeeker ? 'Profile' : 'Dashboard'}>
              <Link href={isSeeker ? '/profile' : '/dashboard/settings'}>
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={getImageUrl(
                      isSeeker
                        ? fetchedProfile?.seeker?.image
                        : fetchedProfile?.employer?.image,
                    )}
                  />
                  <AvatarFallback>
                    <ScaleLoader height={10} />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </TooltipWrapper>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
