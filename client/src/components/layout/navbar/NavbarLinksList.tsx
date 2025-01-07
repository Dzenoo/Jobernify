'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  return (
    <div className="flex items-center gap-6">
      {Array.from(data).map(({ href, title, id }) => (
        <button
          key={id}
          className={` flex items-center gap-3 transition-colors hover:text-[#0066ff] dark:hover:text-[#0066ff] ${
            pathname === href
              ? 'text-[#0066ff]'
              : 'text-[--black-base-color] dark:text-white'
          }`}
          onClick={() => router.push(href)}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default NavbarLinksList;
