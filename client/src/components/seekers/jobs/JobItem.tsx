import React from 'react';
import Link from 'next/link';

import { GraduationCap, MapPin, Timer } from 'lucide-react';

import SaveJobButton from './SaveJobButton';

import {
  checkExpired,
  findLocationData,
  formatDate,
  getImageUrl,
  getTime,
  truncate,
} from '@/lib/utils';
import { renderIconText } from '@/helpers';

import { IJob } from '@/types';

import { Avatar, AvatarImage } from '@/components/ui/utilities/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/layout/card';
import { TooltipWrapper } from '@/components/ui/info/tooltip-wrapper';

type JobItemProps = {
  job: IJob;
  showDescription?: boolean;
};

const JobItem: React.FC<JobItemProps> = ({
  job: {
    _id,
    title,
    employer,
    overview,
    expiration_date,
    createdAt,
    location,
    level,
    applications,
  },
  showDescription = true,
}) => {
  const isJobExpired = checkExpired(expiration_date);
  const expirationDate = formatDate(expiration_date);
  const createdTime = getTime(createdAt);

  let JobInfoData = [
    {
      id: '1',
      data: findLocationData(location),
      icon: <MapPin />,
      tooltip: 'Location',
    },
    {
      id: '2',
      data: level,
      icon: <GraduationCap />,
      tooltip: 'Level',
    },
    {
      id: '3',
      data: expirationDate,
      icon: <Timer />,
      tooltip: 'Expiration',
    },
  ];

  return (
    <li>
      <Card hoverable={true}>
        <CardHeader>
          <div className="flex justify-between sm:items-center">
            <div className="flex items-center gap-3 flex-wrap">
              <Link href={`/employers/${employer._id}?section=jobs`}>
                <Avatar className="border border-blue-100 dark:border-[#1b1b1b] w-14 h-14">
                  <AvatarImage
                    src={getImageUrl(employer?.image)}
                    className="object-cover w-auto h-auto"
                  />
                </Avatar>
              </Link>
              <div className="flex flex-col gap-[3px]">
                <div>
                  <TooltipWrapper tooltip={'View Job'} side="right">
                    <Link href={`/jobs/${_id}`}>
                      <h1 className="transition-all hover:text-blue-700 text-base-black max-sm:text-lg">
                        {title}
                      </h1>
                    </Link>
                  </TooltipWrapper>
                </div>
                <div className="flex items-center gap-3 max-sm:flex-wrap">
                  <div>
                    <Link href={`/employers/${employer._id}?section=jobs`}>
                      <p className="text-muted-foreground text-sm font-light">
                        {employer?.name}
                      </p>
                    </Link>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm font-light">
                      {applications?.length} Applicants
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <SaveJobButton jobId={_id} />
          </div>
        </CardHeader>
        {showDescription && (
          <CardContent className="pt-0 break-words">
            <div>
              <p className="text-initial-black hidden md:block">{overview}</p>
              <p className="text-initial-black md:hidden">
                {truncate(overview, 80)}
              </p>
            </div>
          </CardContent>
        )}
        <CardFooter className="border-t border-gray-100 dark:border-[#1b1b1b] pt-6 flex items-center justify-between gap-10 whitespace-nowrap overflow-x-auto">
          <div className="flex items-center gap-6 justify-between">
            {JobInfoData.map((data) =>
              renderIconText({
                ...data,
                tooltip: true,
                tooltipContent: data.tooltip,
              }),
            )}
          </div>
          <div className="flex items-center gap-3">
            {isJobExpired && (
              <div className="flex items-center gap-3">
                <div>
                  <Timer color="#d70000" />
                </div>
                <div>
                  <p className="text-[--red-base-color] ">Expired</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-muted-foreground truncate">{createdTime}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};

export default JobItem;
