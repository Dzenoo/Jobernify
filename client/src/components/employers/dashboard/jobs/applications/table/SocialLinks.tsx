import React from "react";
import Link from "next/link";

import { Github, ImageIcon, Linkedin } from "lucide-react";

import { SeekerTypes } from "@/types";

type SocialLinksProps = {
  seeker: Pick<SeekerTypes, "github" | "linkedin" | "portfolio">;
};

const SocialLinks: React.FC<SocialLinksProps> = ({
  seeker: { github, linkedin, portfolio },
}) => {
  return (
    <div className="flex items-center gap-6">
      {github === "" ? (
        <div className="text-initial-gray cursor-not-allowed">
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
      {linkedin === "" ? (
        <div className="text-initial-gray cursor-not-allowed">
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
      {portfolio === "" ? (
        <div className="text-initial-gray cursor-not-allowed">
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
