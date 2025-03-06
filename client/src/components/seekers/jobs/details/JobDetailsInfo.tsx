import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Building,
  Calendar,
  CircleDollarSignIcon,
  GraduationCap,
  LayoutTemplate,
  MapPinIcon,
  Timer,
} from 'lucide-react';

import {
  SeekerQueryType,
  useSeekerQuery,
} from '@/hooks/queries/useSeeker.query';

import MarkdownRenderer from '@/components/shared/ui/MarkdownRenderer';
import SaveJobButton from '../SaveJobButton';
import Navigator from '@/components/ui/navigation/navigator';

import { renderIconText, renderSkills } from '@/helpers';
import {
  checkExpired,
  findIndustriesData,
  findLocationData,
  formatDate,
  getImageUrl,
  getSkillsData,
  getTime,
} from '@/lib/utils';

import { IApplication, IJob } from '@/types';

import { Button } from '@/components/ui/buttons/button';
import { Avatar, AvatarImage } from '@/components/ui/utilities/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/layout/card';

type JobDetailsInfoProps = {
  job: IJob;
  onApplyJob?: () => void;
};

const JobDetailsInfo: React.FC<JobDetailsInfoProps> = React.memo(
  ({
    job: {
      _id,
      employer,
      title,
      description,
      expiration_date,
      createdAt,
      applications,
      skills,
      position,
      type,
      level,
      salary,
      overview,
      location,
    },
    onApplyJob,
  }) => {
    const router = useRouter();
    const { data } = useSeekerQuery({
      type: SeekerQueryType.GET_SEEKER_PROFILE,
      params: { query: {} },
    });

    if (!data) {
      return;
    }

    const expirationDate = formatDate(expiration_date);
    const createdTime = getTime(createdAt);
    const isJobExpired = checkExpired(expiration_date);
    const categorizedSkills = getSkillsData(skills);
    const isAppliedToJob = data.seeker.applications.find(
      (application: IApplication) => application.job._id === _id,
    );

    const EmployerInformationsData = [
      {
        tooltip: 'Location',
        id: '1',
        icon: <MapPinIcon />,
        data: employer.address || findLocationData(location),
      },
      {
        tooltip: 'Size',
        id: '2',
        icon: <LayoutTemplate />,
        data: employer.size || 'N/A',
      },
    ];

    const JobInformationsData = [
      {
        tooltip: 'Created At',
        id: '1',
        icon: <Calendar />,
        data: createdTime,
      },
      {
        tooltip: 'Expires At',
        id: '2',
        icon: <Timer />,
        data: expirationDate,
      },
      {
        tooltip: 'Applicants',
        id: '3',
        icon: <GraduationCap />,
        data: applications.length + ' Applications',
      },
    ];

    const JobDetailsData = [
      {
        id: '1',
        icon: <Calendar />,
        data: position,
        title: 'Position',
      },
      {
        id: '2',
        icon: <Timer />,
        data: type,
        title: 'Time',
      },
      {
        id: '3',
        icon: <GraduationCap />,
        data: level,
        title: 'Level',
      },
      {
        id: '4',
        icon: <CircleDollarSignIcon color="green" />,
        data: salary + `$/month`,
        title: 'Salary',
      },
    ];

    const redirectToProfileApplications = () => router.push(`/profile`);

    return (
      <div className="flex flex-col gap-3">
        <Navigator info="Jobs" href={'/jobs'} title={title} />
        <Card>
          <CardHeader>
            <div className="flex justify-between gap-6 max-md:flex-col">
              <div className="flex gap-3 max-sm:flex-col sm:items-center">
                <Link href={`/employers/${employer._id}?section=jobs`}>
                  <Avatar className="border border-blue-100 dark:border-[#1b1b1b] w-28 h-28">
                    <AvatarImage
                      src={getImageUrl(employer.image)}
                      className="object-cover w-auto h-auto"
                    />
                  </Avatar>
                </Link>
                <div className="flex flex-col gap-3">
                  <div>
                    <Link href={`/employers/${employer._id}?section=jobs`}>
                      <h3 className="text-initial-black">{employer.name}</h3>
                    </Link>
                  </div>
                  {renderIconText({
                    tooltip: true,
                    tooltipContent: 'Industry',
                    id: '3',
                    icon: <Building />,
                    data: findIndustriesData(employer.industry) || 'N/A',
                  })}
                  <div className="flex items-center gap-3 flex-wrap">
                    {EmployerInformationsData.map((data) =>
                      renderIconText({
                        ...data,
                        tooltip: true,
                        tooltipContent: data.tooltip,
                      }),
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="basis-full">
                  <Button
                    disabled={!isAppliedToJob && isJobExpired}
                    className="w-full px-6"
                    variant={
                      isAppliedToJob || isJobExpired ? 'outline' : 'default'
                    }
                    onClick={
                      isAppliedToJob
                        ? redirectToProfileApplications
                        : isJobExpired
                        ? undefined
                        : onApplyJob
                    }
                  >
                    {isAppliedToJob
                      ? 'View Status'
                      : isJobExpired
                      ? 'Expired'
                      : 'Apply to Job'}
                  </Button>
                </div>
                <SaveJobButton jobId={_id} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 pt-0">
            <div>
              <h1 className="text-base-black font-semibold">{title}</h1>
            </div>
            <div className="flex items-center gap-6 max-sm:justify-between max-sm:flex-wrap">
              {JobInformationsData.map((data) =>
                renderIconText({
                  ...data,
                  tooltip: true,
                  tooltipContent: data.tooltip,
                }),
              )}
            </div>
            <div className="px-10 border border-gray-100 dark:border-[#1b1b1b] rounded-xl flex items-center gap-6 justify-between py-4 max-sm:flex-col">
              {JobDetailsData.map((data) => renderJobDetails(data))}
            </div>
            <div>
              <div>
                <h1 className="font-semibold">Overview</h1>
              </div>
              <div className="py-3">
                <p>{overview}</p>
              </div>
            </div>
            <div>
              <div>
                <h1 className="font-semibold">Description</h1>
              </div>
              <div>
                <MarkdownRenderer
                  className="jobDescription"
                  content={description}
                />
              </div>
            </div>
            <div>
              <div>
                <h1 className="font-semibold">Skills</h1>
              </div>
              {renderSkills(categorizedSkills)}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);

const renderJobDetails = <
  T extends {
    id: string;
    icon: React.JSX.Element;
    title: string;
    data: string | number;
  },
>({
  id,
  icon,
  title,
  data,
}: T) => {
  return (
    <div
      key={id}
      className="flex flex-col items-center justify-center gap-3 overflow-auto"
    >
      <div>{icon}</div>
      <div>
        <h1 className="font-semibold">{data}</h1>
      </div>
      <div>
        <p className="text-muted-foreground text-base">{title}</p>
      </div>
    </div>
  );
};

export default JobDetailsInfo;
