'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
          <div>
            <h1 className="text-lg font-bold">Popular Job Titles</h1>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">
              Popular job titles are based on current market trends and seekers
              interests.
            </p>
          </div>
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
