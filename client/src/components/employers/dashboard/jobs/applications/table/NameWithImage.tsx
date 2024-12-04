import React from "react";

import Image from "next/image";

import { getImageUrl } from "@/lib/utils";

import { SeekerTypes } from "@/types";
import Link from "next/link";

type NameWithImage = {
  seeker: Pick<SeekerTypes, "_id" | "first_name" | "last_name" | "image">;
};

const NameWithImage: React.FC<NameWithImage> = ({
  seeker: { _id, first_name, last_name, image },
}) => {
  return (
    <div className="flex items-center gap-3">
      <Link href={`/seekers/${_id}`}>
        <Image
          width={30}
          height={30}
          className="rounded-full object-cover min-w-[30px] min-h-[30px]"
          src={getImageUrl(image)}
          alt={`${first_name} ${last_name}`}
        />
      </Link>
      <div>
        <Link href={`/seekers/${_id}`}>
          <h1>
            {first_name} {last_name}
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default NameWithImage;
