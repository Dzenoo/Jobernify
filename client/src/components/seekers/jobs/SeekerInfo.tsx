import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getImageUrl } from '@/lib/utils';

import useGetSeeker from '@/hooks/queries/useGetSeeker.query';

import LoadingSeekerInfo from '@/components/loaders/employers/LoadingSeekerInfo';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SeekerInfo: React.FC = React.memo(() => {
  const { data: fetchedSeeker, isLoading } = useGetSeeker();

  if (!fetchedSeeker) {
    if (isLoading) {
      return <LoadingSeekerInfo />;
    } else {
      return null;
    }
  }

  const seeker = fetchedSeeker.seeker;

  const profileImageUrl = getImageUrl(seeker.image);

  return (
    <Card>
      <CardContent className="flex flex-col gap-5 items-center justify-center">
        <div>
          <Image
            src={profileImageUrl}
            width={150}
            height={150}
            className="border border-gray-100 rounded-full w-28 h-28 object-cover"
            alt="seeker"
          />
        </div>
        <div className="flex flex-col gap-3 items-center justify-center text-center">
          <div>
            <h1 className="font-bold">
              {seeker.first_name} {seeker.last_name}
            </h1>
          </div>
          {seeker.headline && (
            <div>
              <p className="text-gray-500 dark:text-gray-400">
                {seeker.headline}
              </p>
            </div>
          )}
          <div>
            <Link href={`/profile`}>
              <Button className="px-10">Edit Profile</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default SeekerInfo;
