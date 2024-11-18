import React from "react";

import useSearchParams from "@/hooks/defaults/useSearchParams";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type PopularsJobsInfoProps = {
  jobs: {
    _id: string;
    title: string;
  }[];
};

const PopularJobsInfo: React.FC<PopularsJobsInfoProps> = ({ jobs }) => {
  const { updateSearchParams } = useSearchParams();

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
          {jobs.map((job, index) => (
            <Button
              variant="outline"
              key={job._id}
              className={`w-full ${index < jobs.length - 1 ? "mb-2" : ""}`}
              onClick={() => updateSearchParams("query", job.title)}
            >
              {job.title}
            </Button>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default PopularJobsInfo;
