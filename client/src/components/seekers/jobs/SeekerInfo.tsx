import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Save } from 'lucide-react';

import { getImageUrl } from '@/lib/utils';
import { useGetSeeker } from '@/hooks/queries/useGetSeeker.query';
import { renderIconText } from '@/helpers';

import LoadingSeekerInfo from '@/components/templates/employers/LoadingSeekerInfo';

import { Card, CardContent } from '@/components/ui/layout/card';
import { Button } from '@/components/ui/buttons/button';

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

  let SeekerInfoData = [
    {
      id: '1',
      data: seeker.savedJobs.length,
      icon: <Save />,
      tooltip: 'Saved Jobs',
    },
    {
      id: '2',
      data: seeker.applications.length,
      icon: <GraduationCap />,
      tooltip: 'Applications',
    },
  ];

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
        <div className="flex flex-col gap-5 items-center justify-center text-center">
          <div>
            <div>
              <h1 className="font-semibold">
                {seeker.first_name} {seeker.last_name}
              </h1>
            </div>
            {seeker.headline && (
              <div>
                <p className="text-muted-foreground dark:text-muted-foreground">
                  {seeker.headline}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-6 justify-between flex-wrap">
            {SeekerInfoData.map((data) =>
              renderIconText({
                ...data,
                tooltip: true,
                tooltipContent: data.tooltip,
              }),
            )}
          </div>
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
