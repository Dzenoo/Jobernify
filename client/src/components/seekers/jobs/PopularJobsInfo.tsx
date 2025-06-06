'use client';

import React from 'react';

import { Button } from '@/components/ui/buttons/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';
import { useToast } from '@/components/ui/info/use-toast';
import { TooltipWrapper } from '@/components/ui/info/tooltip-wrapper';

type PopularsJobsInfoProps = {
  jobs: {
    _id: string;
    title: string;
  }[];
};

const PopularJobsInfo: React.FC<PopularsJobsInfoProps> = React.memo(
  ({ jobs }) => {
    const { toast } = useToast();

    const handleCopyPopularJobTitle = async (title: string) => {
      navigator.clipboard.writeText(title);

      toast({
        title: 'Success',
        description: `${title} copied to clipboard`,
      });
    };

    const hasPopularJobs = jobs && jobs.length > 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Popular Job Titles</CardTitle>
          <CardDescription className="text-base">
            {hasPopularJobs
              ? 'Popular job titles are based on current market trends and seekers interests.'
              : 'There is no popular jobs right now.'}
          </CardDescription>
        </CardHeader>
        {hasPopularJobs && (
          <CardContent className="pt-0">
            {jobs.map(({ _id, title }, index) => (
              <TooltipWrapper key={_id} tooltip={title}>
                <Button
                  variant="outline"
                  className={`w-full ${index < jobs.length - 1 ? 'mb-2' : ''}`}
                  onClick={() => handleCopyPopularJobTitle(title)}
                >
                  {title}
                </Button>
              </TooltipWrapper>
            ))}
          </CardContent>
        )}
      </Card>
    );
  },
);

export default PopularJobsInfo;
