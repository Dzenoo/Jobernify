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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
              <TooltipProvider key={_id} delayDuration={400}>
                <Tooltip>
                  <TooltipTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      className={`w-full ${
                        index < jobs.length - 1 ? 'mb-2' : ''
                      }`}
                      onClick={() => handleCopyPopularJobTitle(title)}
                    >
                      {title}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy to clipboard</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </CardContent>
        )}
      </Card>
    );
  },
);

export default PopularJobsInfo;
