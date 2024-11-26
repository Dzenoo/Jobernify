import React from "react";

import Image from "next/image";

import { getImageUrl } from "@/lib/utils";

import { SeekerTypes } from "@/types";

type NameWithImage = {
  seeker: SeekerTypes;
};

const NameWithImage: React.FC<NameWithImage> = ({ seeker }) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        width={30}
        height={30}
        className="rounded-full object-cover"
        src={getImageUrl(seeker.image)}
        alt={`${seeker.first_name} ${seeker.last_name}`}
      />
      <div>
        <h1>
          {seeker.first_name} {seeker.last_name}
        </h1>
      </div>
    </div>
  );
};

export default NameWithImage;
