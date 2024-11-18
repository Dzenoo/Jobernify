import Image from "next/image";
import Link from "next/link";
import React from "react";

type NavigatorProps = {
  href: string;
  title: string;
  info: string;
};

const Navigator: React.FC<NavigatorProps> = ({ href, title, info }) => {
  return (
    <div className="flex items-center gap-6">
      <div>
        <Image
          src={"/images/logo-icon.png"}
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
        <p className="text-initial-gray">{title}</p>
      </div>
    </div>
  );
};

export default Navigator;
