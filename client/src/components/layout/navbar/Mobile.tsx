"use client";

import React from "react";
import { usePathname } from "next/navigation";

import useAuthentication from "@/hooks/defaults/useAuthentication";
import { SeekersNavbarLinks } from "@/constants";

import NavbarLinksList from "./NavbarLinksList";

const MobileBar: React.FC = () => {
  const { isAuthenticated, userType } = useAuthentication().getCookieHandler();
  const pathname = usePathname();
  const isSeeker = userType === "seeker";

  if (!isAuthenticated) return null;

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
