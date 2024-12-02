import React from "react";

import Image from "next/image";

import { getImageUrl } from "@/lib/utils";

import { SeekerTypes } from "@/types";

type NameWithImage = {
  seeker: Pick<SeekerTypes, "first_name" | "last_name" | "image">;
};

const NameWithImage: React.FC<NameWithImage> = ({
  seeker: { first_name, last_name, image },
}) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        width={30}
        height={30}
        className="rounded-full object-cover"
        src={getImageUrl(image)}
        alt={`${first_name} ${last_name}`}
      />
      <div>
        <h1>
          {first_name} {last_name}
        </h1>
      </div>
    </div>
  );
};

export default NameWithImage;
