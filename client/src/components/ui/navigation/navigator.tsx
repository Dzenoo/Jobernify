import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type NavigatorProps = {
  href: string;
  title: string;
  info: string;
};

const Navigator: React.FC<NavigatorProps> = ({ href, title, info }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-6 whitespace-nowrap overflow-auto hide-scrollbar">
      <div>
        <Image
          className="min-w-[40px] min-h-[40px]"
          src={
            resolvedTheme === 'dark'
              ? '/images/logo-icon-dark.png'
              : '/images/logo-icon.png'
          }
          alt="logo_light_talentify"
          width={40}
          height={40}
          loading="lazy"
        />
      </div>
      <div>
        <Link href={href} className="text-[--blue-base-color]">
          {info}
        </Link>
      </div>
      <div>
        <p className="text-muted-foreground text-base">{title}</p>
      </div>
    </div>
  );
};

export default Navigator;
