import React from 'react';
import Link from 'next/link';

import { Github, ImageIcon, Linkedin } from 'lucide-react';

import { Seeker } from '@/types';

type SocialLinksProps = {
  seeker: Pick<Seeker, 'github' | 'linkedin' | 'portfolio'>;
};

const SocialLinks: React.FC<SocialLinksProps> = ({
  seeker: { github, linkedin, portfolio },
}) => {
  return (
    <div className="flex items-center gap-6">
      {github === '' ? (
        <div className="text-muted-foreground cursor-not-allowed">
          <Github />
        </div>
      ) : (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${github}`}
        >
          <Github />
        </Link>
      )}
      {linkedin === '' ? (
        <div className="text-muted-foreground cursor-not-allowed">
          <Linkedin />
        </div>
      ) : (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${linkedin}`}
        >
          <Linkedin />
        </Link>
      )}
      {portfolio === '' ? (
        <div className="text-muted-foreground cursor-not-allowed">
          <ImageIcon />
        </div>
      ) : (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${portfolio}`}
        >
          <ImageIcon />
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
