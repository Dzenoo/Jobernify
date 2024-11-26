import React from "react";
import Link from "next/link";

import { Github, ImageIcon, Linkedin } from "lucide-react";

import { SeekerTypes } from "@/types";

type SocialLinksProps = { seeker: SeekerTypes };

const SocialLinks: React.FC<SocialLinksProps> = ({ seeker }) => {
  return (
    <div className="flex items-center gap-6">
      {seeker.github === "" ? (
        <div className="text-initial-gray cursor-not-allowed">
          <Github />
        </div>
      ) : (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${seeker.github}`}
        >
          <Github />
        </Link>
      )}
      {seeker.linkedin === "" ? (
        <div className="text-initial-gray cursor-not-allowed">
          <Linkedin />
        </div>
      ) : (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${seeker.linkedin}`}
        >
          <Linkedin />
        </Link>
      )}
      {seeker.portfolio === "" ? (
        <div className="text-initial-gray cursor-not-allowed">
          <ImageIcon />
        </div>
      ) : (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`https://${seeker.portfolio}`}
        >
          <ImageIcon />
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
