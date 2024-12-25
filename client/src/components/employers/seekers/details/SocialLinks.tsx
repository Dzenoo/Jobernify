import React from 'react';

import { formatURL } from '@/lib/utils';

type SocialLink = {
  id: string;
  href?: string | null;
  icon: React.ReactNode;
  label: string;
};

type SocialLinksProps = {
  links: SocialLink[];
};

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex flex-wrap items-center gap-10">
      {links.map(({ id, href, icon, label }) =>
        href ? (
          <a
            key={id}
            className="text-[--blue-base-color]"
            href={formatURL(href)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            {icon}
          </a>
        ) : (
          <div
            key={id}
            className="cursor-not-allowed text-muted-foreground"
            title={`No valid link for ${label}`}
            aria-hidden
          >
            {icon}
          </div>
        ),
      )}
    </div>
  );
};

export default SocialLinks;
