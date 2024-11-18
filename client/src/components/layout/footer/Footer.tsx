"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterLinks } from "@/constants";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  const isLanding = pathname === "/";

  return (
    <footer
      className={`p-5 shadow-lg border-t bg-white flex flex-col gap-6 dark:bg-[#0d0d0d] dark:border-[#1b1b1b] ${
        isLanding && "px-5 py-10 md:px-28"
      }`}
    >
      <div className="flex justify-between gap-10 items-start border-b pb-6 max-xl:flex-wrap dark:border-[#1b1b1b]">
        <div className="flex flex-col gap-3 basis-[36em] max-xl:basis-full">
          <div>
            <Image
              src={`/images/logo-${
                resolvedTheme === "dark" ? "dark" : "light"
              }.png`}
              alt="light-talentify-logo"
              width={100}
              height={100}
              loading="lazy"
              style={{ objectFit: "cover", width: "auto", height: "auto" }}
            />
          </div>
          <div>
            <p className="text-[#1b1b1b] dark:text-white leading-[28px]">
              Founded with a passion for connecting job seekers with their dream
              careers, our mission is to simplify the job search process and
              empower individuals to find fulfilling employment opportunities.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-16 max-lg:flex-wrap">
          {FooterLinks.map((footer) => renderFooterLinks(footer))}
        </div>
      </div>
      <div>
        <div>
          <p className="text-[#1b1b1b] dark:text-white">
            &copy; 2024 Copyright, Jobernify
          </p>
        </div>
      </div>
    </footer>
  );
};

type FooterLinkDivProps = {
  title: string;
  links: {
    id: string;
    href: string;
    name: string;
  }[];
  id: string;
};

function renderFooterLinks<T extends FooterLinkDivProps>({
  title,
  links,
  id,
}: T) {
  return (
    <div key={id} className="flex flex-col gap-3">
      <div>
        <h1 className="text-blue-500">{title}</h1>
      </div>
      <div>
        <ul className="flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.id}>
              <Link href={link.href} className="text-[#1b1b1b] dark:text-white">
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
