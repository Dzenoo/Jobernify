'use client';

import React from 'react';

import { useTheme } from 'next-themes';

import Image from 'next/image';
import Link from 'next/link';

import { FooterLinks } from '@/constants';

const Footer: React.FC = () => {
  const { resolvedTheme } = useTheme();

  return (
    <footer className="px-5 py-8 shadow-lg bg-white dark:bg-[#0d0d0d]">
      <div className="flex justify-between gap-10 items-start dark:border-[#1b1b1b] max-xl:flex-wrap">
        <div className="flex flex-col gap-5 basis-[36em] max-xl:basis-full">
          <div className="w-fit">
            <Link href="/">
              <Image
                src={
                  resolvedTheme === 'dark'
                    ? '/images/logo-dark.png'
                    : '/images/logo-light.png'
                }
                alt="light-talentify-logo"
                width={100}
                height={100}
                loading="lazy"
                className="w-fit"
              />
            </Link>
          </div>
          <div>
            <p className="text-muted-foreground text-sm leading-[25px]">
              Founded with a passion for connecting job seekers with their dream
              careers, our mission is to simplify the job search process and
              empower individuals to find fulfilling employment opportunities.
            </p>
          </div>
          <div className="text-muted-foreground text-sm">
            &copy; 2024 Copyright, Jobernify. All rights reserved
          </div>
        </div>
        <div className="flex items-start justify-between gap-16 max-lg:flex-wrap">
          {FooterLinks.map((footer) => renderFooterLinks(footer))}
        </div>
      </div>
    </footer>
  );
};

function renderFooterLinks<
  T extends {
    title: string;
    links: {
      id: string;
      href: string;
      name: string;
    }[];
    id: string;
  },
>({ title, links, id }: T): React.JSX.Element {
  return (
    <div key={id} className="space-y-3">
      <div>
        <h1 className="text-sm font-medium uppercase">{title}</h1>
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-muted-foreground text-sm transition-all dark:text-white hover:text-gray-900"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
