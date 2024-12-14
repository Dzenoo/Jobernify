import React from "react";
import Link from "next/link";

import { GraduationCap, MapPin, Timer } from "lucide-react";

import SaveJobButton from "./SaveJobButton";

import {
  checkExpired,
  findLocationData,
  formatDate,
  getImageUrl,
  getTime,
  truncate,
} from "@/lib/utils";
import { renderIconText } from "@/helpers";

import { JobTypes } from "@/types";

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

const JobItem: React.FC<JobItemProps> = ({
  job: {
    _id,
    title,
    company,
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

  let FooterInfoData = [
    {
      id: "1",
      data: findLocationData(location),
      icon: <MapPin />,
      tooltip: "Location",
    },
    {
      id: "2",
      data: level,
      icon: <GraduationCap />,
      tooltip: "Level",
    },
    {
      id: "3",
      data: expirationDate,
      icon: <Timer />,
      tooltip: "Expiration",
    },
  ];

  return (
    <li>
      <Card hoverable={true}>
        <CardHeader>
          <div className="flex justify-between sm:items-center">
            <div className="flex items-center gap-3 flex-wrap">
              <Link href={`/companies/${company._id}?section=jobs`}>
                <Avatar className="border border-blue-100 dark:border-[#1b1b1b] w-14 h-14">
                  <AvatarImage
                    src={getImageUrl(company?.image)}
                    className="object-cover w-auto h-auto"
                  />
                </Avatar>
              </Link>
              <div className="flex flex-col gap-[3px]">
                <div>
                  <TooltipProvider delayDuration={400}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={`/jobs/${_id}`}>
                          <h1 className="transition-all hover:text-blue-700 text-base-black font-bold max-sm:text-lg">
                            {title}
                          </h1>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">View Job</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-3 max-sm:flex-wrap">
                  <div>
                    <Link href={`/companies/${company._id}?section=jobs`}>
                      <p className="text-low-gray">{company?.name}</p>
                    </Link>
                  </div>
                  <div>
                    <p className="text-low-gray">
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
