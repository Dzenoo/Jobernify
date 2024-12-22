'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { TooltipWrapper } from '@/components/ui/tooltip-wrapper';

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

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Popular Job Titles</CardTitle>
          <CardDescription className="text-base">
            Popular job titles are based on current market trends and seekers
            interests.
          </CardDescription>
        </CardHeader>
        {jobs && jobs.length > 0 && (
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
