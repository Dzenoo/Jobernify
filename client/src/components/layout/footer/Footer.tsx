'use client';

import React from 'react';
import Link from 'next/link';

import { FooterLinks } from '@/constants';
import { cn } from '@/lib/utils';

import Logo from '../navbar/Logo';
import LinkedinIcon from '@/components/shared/icons/LinkedinIcon';

const Footer: React.FC = () => {
  return (
    <footer
      className={cn(
        'px-5 py-8 shadow-lg bg-white border-t dark:border-[#1b1b1b] border-gray-100 dark:bg-[#0d0d0d]',
      )}
    >
      <div className="flex justify-between gap-10 items-start dark:border-[#1b1b1b] max-xl:flex-wrap">
        <div className="flex flex-col gap-5 basis-[36em] max-xl:basis-full">
          <div className="w-fit">
            <Logo />
          </div>
          <div>
            <p className="text-muted-foreground text-sm leading-[25px]">
              Founded with a passion for connecting job seekers with their dream
              careers, our mission is to simplify the job search process and
              empower individuals to find fulfilling employment opportunities.
            </p>
          </div>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={FooterLinks.find((link) => link.id === '5')?.links[0].href}
            >
              <LinkedinIcon />
            </a>
          </div>
          <div className="text-muted-foreground text-sm">
            &copy; 2024 Copyright, Jobernify. All rights reserved
          </div>
        </div>
        <div className="flex items-start justify-between gap-16 max-lg:flex-wrap">
          {FooterLinks.slice(0, 4).map((links) => renderFooterLinks(links))}
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
                className="text-muted-foreground text-sm transition-all hover:text-black dark:hover:text-white"
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
