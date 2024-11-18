import React from "react";

import { getImageUrl } from "@/lib/utils";
import useGetSeeker from "@/hooks/queries/useGetSeeker";
import Image from "next/image";
import Link from "next/link";
import LoadingSeekerInfo from "@/components/loaders/LoadingSeekerInfo";

import { SeekerTypes } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SeekerInfo: React.FC = () => {
  const { data: fetchedSeeker, isLoading } = useGetSeeker();
  const seeker = fetchedSeeker?.seeker as SeekerTypes;
  const profileImageUrl = getImageUrl(seeker?.image);

  if (isLoading) {
    return <LoadingSeekerInfo />;
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-5 items-center justify-center">
        <div>
          <Image
            src={profileImageUrl}
            width={150}
            height={150}
            className="rounded-full w-28 h-28 object-cover"
            alt="seeker"
          />
        </div>
        <div>
          <h1 className="font-bold">
            {seeker?.first_name} {seeker?.last_name}
          </h1>
        </div>
        {seeker?.headline && (
          <div>
            <p className="text-gray-500 dark:text-gray-400">
              {seeker?.headline}
            </p>
          </div>
        )}
        <div>
          <Link href={`/profile`}>
            <Button className="px-10">Edit Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeekerInfo;
