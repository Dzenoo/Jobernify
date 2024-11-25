import React from "react";
import Link from "next/link";

import { GraduationCap, MapPin, Timer } from "lucide-react";

import SaveJobButton from "./SaveJobButton";

import { JobTypes } from "@/types";

import {
  checkExpired,
  findLocationData,
  formatDate,
  getImageUrl,
  getTime,
} from "@/lib/utils";
import { renderIconText } from "@/helpers";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type JobItemProps = {
  job: JobTypes;
  showDescription?: boolean;
};

const JobItem: React.FC<JobItemProps> = ({ job, showDescription = true }) => {
  const isJobExpired = checkExpired(job.expiration_date);
  const expirationDate = formatDate(job.expiration_date);
  const createdTime = getTime(job.createdAt);

  let FooterInfoData = [
    {
      id: "1",
      data: findLocationData(job.location),
      icon: <MapPin color="gray" />,
      tooltip: "Location",
    },
    {
      id: "2",
      data: job.level,
      icon: <GraduationCap color="gray" />,
      tooltip: "Level",
    },
    {
      id: "3",
      data: expirationDate,
      icon: <Timer color="gray" />,
      tooltip: "Expiration",
    },
  ];

  return (
    <li>
      <Card hoverable={true}>
        <CardHeader>
          <div className="flex justify-between sm:items-center">
            <div className="flex items-center gap-3 flex-wrap">
              <Link href={`/companies/${job?.company._id}?section=jobs`}>
                <Avatar className="border border-blue-900 w-12 h-12">
                  <AvatarImage
                    src={getImageUrl(job.company?.image)}
                    className="object-cover w-auto h-auto"
                  />
                </Avatar>
              </Link>
              <div className="flex flex-col gap-[3px]">
                <div>
                  <TooltipProvider delayDuration={0.1}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={`/jobs/${job._id}`}>
                          <h1 className="transition-all hover:text-blue-700 text-base-black font-bold max-sm:text-lg">
                            {job.title}
                          </h1>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">View Job</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-3 max-sm:flex-wrap">
                  <div>
                    <p className="text-low-gray">{job.company?.name}</p>
                  </div>
                  <div>
                    <p className="text-low-gray">
                      {job?.applications?.length} Applicants
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <SaveJobButton jobId={job?._id} />
          </div>
        </CardHeader>
        {showDescription && (
          <CardContent className="pt-0 break-words">
            <div>
              <p className="text-initial-black hidden md:block">
                {job.overview}
              </p>
              <p className="text-initial-black md:hidden">
                {job.overview.length > 80 &&
                  job.overview.substring(0, 80) + "......"}
              </p>
            </div>
          </CardContent>
        )}
        <CardFooter className="border-t border-gray-100 dark:border-[#5c5c5c] pt-6 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-6 justify-between flex-wrap">
            {FooterInfoData.map((data) =>
              renderIconText({
                ...data,
                tooltip: true,
                tooltipContent: data.tooltip,
              })
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
            <div className="max-sm:hidden">
              <p className="text-initial-gray truncate">{createdTime}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};

export default JobItem;
