import React from 'react';

import Link from 'next/link';

import {
  Briefcase,
  Building,
  Calendar,
  CalendarCheck,
  GraduationCap,
  MapPin,
  LayoutTemplate,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/layout/card';

import { findIndustriesData, formatDate, getImageUrl } from '@/lib/utils';
import { renderIconText } from '@/helpers';

import { Application } from '@/types';
import { Avatar, AvatarImage } from '@/components/ui/utilities/avatar';

type ApplicationItemProps = {
  application: Pick<Application, '_id' | 'status' | 'createdAt' | 'job'>;
};

const ApplicationsItem: React.FC<ApplicationItemProps> = ({
  application: {
    status,
    createdAt,
    job: {
      _id: jobId,
      employer: { _id: employerId, industry, name, size, address, image },
      level,
      position,
      title,
      type,
    },
  },
}) => {
  const appliedDate = formatDate(createdAt || '');

  const ApplicationEmployerInfo = [
    {
      id: '1',
      icon: <Building />,
      data: findIndustriesData(industry),
    },
    {
      id: '2',
      icon: <MapPin />,
      data: address,
    },
    {
      id: '3',
      icon: <LayoutTemplate />,
      data: size,
    },
  ];

  const ApplicationJobInfo = [
    {
      id: '1',
      icon: <GraduationCap />,
      data: level,
    },
    {
      id: '2',
      icon: <Briefcase />,
      data: type,
    },
    {
      id: '3',
      icon: <Calendar />,
      data: position,
    },
  ];

  const applicationStatusAccepted = status === 'Accepted';
  const applicationStatusRejected = status === 'Rejected';
  const applicationsStatusInterview = status === 'Interview';

  return (
    <Card className="dark:border-[#3b3b3b]">
      <CardHeader>
        <div className="flex gap-3 items-center max-xl:flex-wrap">
          <Link href={`/employers/${employerId}?section=jobs`}>
            <Avatar className="w-28 h-28 border border-blue-100 dark:border-[#1b1b1b] ">
              <AvatarImage
                src={getImageUrl(image)}
                className="object-cover w-auto h-auto"
              />
            </Avatar>
          </Link>
          <div className="space-y-3">
            <div>
              <Link href={`/employers/${employerId}?section=jobs`}>
                <h1>{name}</h1>
              </Link>
            </div>
            <div className="flex gap-3 items-center flex-wrap">
              {ApplicationEmployerInfo.map((data) => renderIconText(data))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Link href={`/jobs/${jobId}`}>
              <h1 className="font-semibold text-xl overflow-auto">{title}</h1>
            </Link>
          </div>
          <div className="flex gap-6 items-center flex-wrap justify-between">
            {ApplicationJobInfo.map((data) => renderIconText(data))}
          </div>
          <div>
            {renderIconText({
              id: '1',
              icon: <CalendarCheck />,
              data: 'Applied' + ` ${appliedDate}`,
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div
          className={`p-3 rounded-full border w-full overflow-auto text-center ${
            applicationStatusAccepted
              ? 'bg-green-100 dark:bg-green-200'
              : applicationStatusRejected
                ? 'bg-red-100 dark:bg-red-200'
                : applicationsStatusInterview
                  ? 'bg-blue-100 dark:bg-blue-200'
                  : 'bg-yellow-100 dark:bg-yellow-200'
          }`}
        >
          <p
            className={`
           ${
             applicationStatusAccepted
               ? 'text-green-500'
               : applicationStatusRejected
                 ? 'text-red-500'
                 : applicationsStatusInterview
                   ? 'text-blue-500'
                   : 'text-yellow-500'
           }`}
          >
            {status}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationsItem;
