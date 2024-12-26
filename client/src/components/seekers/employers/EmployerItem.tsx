import React from 'react';

import Link from 'next/link';

import { Briefcase, Building, Camera } from 'lucide-react';

import { renderIconText } from '@/helpers';
import { findIndustriesData, getImageUrl, truncate } from '@/lib/utils';

import { Employer } from '@/types';

import FollowEmployerButton from './FollowEmployerButton';

import { Avatar, AvatarImage } from '@/components/ui/utilities/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/layout/card';

type EmployersItemProps = {
  employer: Pick<
    Employer,
    | 'followers'
    | '_id'
    | 'image'
    | 'name'
    | 'companyDescription'
    | 'jobs'
    | 'industry'
  >;
};

const EmployerItem: React.FC<EmployersItemProps> = ({
  employer: { _id, companyDescription, followers, image, industry, jobs, name },
}) => {
  const FooterEmployerData = [
    {
      id: '1',
      icon: <Camera />,
      data:
        followers?.length + ` Follower${followers?.length !== 1 ? 's' : ''}`,
      tooltip: 'Followers',
    },
    {
      id: '2',
      icon: <Briefcase />,
      data: jobs?.length + ` Job${jobs?.length !== 1 ? 's' : ''}`,
      tooltip: 'Jobs',
    },
    {
      id: '3',
      icon: <Building />,
      data: findIndustriesData(industry) || 'N/A',
      tooltip: 'Industry',
    },
  ];

  return (
    <Card hoverable={true}>
      <CardContent className="flex flex-col gap-5">
        <div className="flex justify-between gap-5 max-sm:flex-col">
          <div>
            <Avatar className="border border-blue-100 dark:border-[#1b1b1b] w-28 h-28 max-sm:w-20 max-sm:h-20">
              <AvatarImage
                src={getImageUrl(image)}
                className="object-cover w-auto h-auto"
              />
            </Avatar>
          </div>
          <div>
            <FollowEmployerButton employerId={_id} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <Link href={`/employers/${_id}?section=jobs`}>
              <h1 className="hover:text-blue-700 hover:underline text-base-black">
                {name}
              </h1>
            </Link>
          </div>
          <div>
            <p className="text-muted-foreground text-base">
              {truncate(companyDescription, 150)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-between gap-6 border-t border-gray-100 pt-6 dark:border-[#1b1b1b] whitespace-nowrap overflow-x-auto">
        {FooterEmployerData.map((data) =>
          renderIconText({
            ...data,
            tooltip: true,
            tooltipContent: data.tooltip,
          }),
        )}
      </CardFooter>
    </Card>
  );
};

export default EmployerItem;
