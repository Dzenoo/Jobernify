"use client";
import React from "react";
import Link from "next/link";

type NavbarLinksListProps = {
  pathname: string;
  data: {
    id: string;
    title: string;
    href: string;
  }[];
};

const NavbarLinksList: React.FC<NavbarLinksListProps> = ({
  pathname,
  data,
}) => {
  return (
    <div className="flex items-center gap-6">
      {Array.from(data).map(({ href, title, id }) => (
        <Link
          key={id}
          href={href}
          className={`font-extralight flex items-center gap-3 transition-colors hover:text-[#0066ff] dark:hover:text-[#0066ff] ${
            pathname === href
              ? "text-[#0066ff]"
              : "text-[--black-base-color] dark:text-white"
          }`}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinksList;
