"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ScaleLoader } from "react-spinners";

import { getImageUrl } from "@/lib/utils";
import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import useFetchProfile from "@/hooks/queries/useFetchProfile.query";

import {
  EmployersNavbarActions,
  SeekersNavbarActions,
  SeekersNavbarLinks,
} from "@/constants";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Logo from "./Logo";
import NavbarActionsList from "./NavbarActionsList";
import NavbarLinksList from "./NavbarLinksList";

const AuthenticationDivLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <Link href={"/login"}>
        <Button variant={"outline"}>Login</Button>
      </Link>
      <Link href={"/signup"}>
        <Button variant={"default"}>Signup</Button>
      </Link>
    </div>
  );
};

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

  const isSeeker = userType === "seeker";

  return (
    <header className="px-5 py-2 dark:bg-[#0d0d0d] base-margin flex justify-between items-center gap-3 overflow-hidden border-b border-base-gray dark:border-[#1b1b1b] bg-white">
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
        {isAuthenticated ? (
          <>
            <NavbarActionsList
              pathname={pathname}
              logout={deleteCookieHandler}
              data={isSeeker ? SeekersNavbarActions : EmployersNavbarActions}
            />
            <TooltipProvider delayDuration={400}>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={isSeeker ? "/profile" : "/dashboard/settings"}>
                    <Avatar>
                      <AvatarImage
                        className="object-cover"
                        src={getImageUrl(
                          isSeeker
                            ? fetchedProfile?.seeker?.image
                            : fetchedProfile?.employer?.image
                        )}
                      />
                      <AvatarFallback>
                        <ScaleLoader height={10} />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  {isSeeker ? "Profile" : "Dashboard"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : (
          <AuthenticationDivLinks />
        )}
      </div>
    </header>
  );
};

export default Navbar;
