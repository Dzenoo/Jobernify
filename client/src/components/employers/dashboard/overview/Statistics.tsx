import React from 'react';

import { Briefcase, CalendarSearch, Folder } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/layout/card';

type StatisticsProps = {
  totalJobs: number;
  totalApplications: number;
  totalFollowers: number;
  jobsThisMonth: number;
  applicationsThisMonth: number;
  followersThisMonth: number;
};

const Statistics: React.FC<StatisticsProps> = ({
  totalApplications,
  totalJobs,
  totalFollowers,
  jobsThisMonth,
  applicationsThisMonth,
  followersThisMonth,
}) => {
  const StatisticsData = [
    {
      id: '1',
      title: 'Total Jobs',
      data: totalJobs,
      increment: jobsThisMonth,
      icon: <Briefcase color="#0066FF" />,
    },
    {
      id: '3',
      title: 'Total Applications',
      data: totalApplications,
      increment: applicationsThisMonth,
      icon: <CalendarSearch color="#007D05" />,
    },
    {
      id: '4',
      title: 'Total Followers',
      data: totalFollowers,
      increment: followersThisMonth,
      icon: <Folder color="#007D05" />,
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {StatisticsData.map((statistics) => (
        <Card key={statistics.id}>
          <CardHeader className="flex justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>{statistics.icon}</div>
              <div>
                <h1 className="text-muted-foreground text-base">
                  {statistics.title}
                </h1>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 justify-between">
              <div>
                <p className="font-semibold text-3xl">{statistics.data}</p>
              </div>
              <div>
                <p
                  className={`${
                    statistics.increment === 0
                      ? 'text-yellow-500'
                      : statistics.increment > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                  }`}
                >
                  {statistics.increment > 0
                    ? `+${statistics.increment}`
                    : statistics.increment}{' '}
                  this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Statistics;
