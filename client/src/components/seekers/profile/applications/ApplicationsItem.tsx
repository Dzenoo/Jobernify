import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Briefcase,
  Building,
  Calendar,
  CalendarCheck,
  GraduationCap,
  MapPin,
  LayoutTemplate,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { findIndustriesData, formatDate, getImageUrl } from "@/lib/utils";
import { renderIconText } from "@/helpers";

import { ApplicationsTypes } from "@/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type ApplicationItemProps = {
  application: ApplicationsTypes;
};

const ApplicationsItem: React.FC<ApplicationItemProps> = ({ application }) => {
  const appliedDate = formatDate(application?.createdAt || "");

  const ApplicationCompanyInfo = new Array(
    {
      id: "1",
      icon: <Building />,
      data: findIndustriesData(application?.job.company.industry),
    },
    {
      id: "2",
      icon: <MapPin />,
      data: application?.job.company.address,
    },
    {
      id: "3",
      icon: <LayoutTemplate />,
      data: application?.job.company.size,
    }
  );

  const ApplicationJobInfo = new Array(
    {
      id: "1",
      icon: <GraduationCap />,
      data: application?.job.level,
    },
    {
      id: "2",
      icon: <Briefcase />,
      data: application?.job.type,
    },
    {
      id: "3",
      icon: <Calendar />,
      data: application?.job.position,
    }
  );

  const applicationStatusAccepted = application?.status === "Accepted";
  const applicationStatusRejected = application?.status === "Rejected";
  const applicationsStatusInterview = application?.status === "Interview";

  return (
    <Card className="dark:border-[#3b3b3b]">
      <CardHeader>
        <div className="flex gap-3 items-center max-xl:flex-wrap">
          <Avatar className="w-28 h-28">
            <AvatarImage
              src={getImageUrl(application?.job.company?.image)}
              className="object-cover w-auto h-auto"
            />
          </Avatar>
          <div className="flex flex-col gap-3">
            <div>
              <h1>{application?.job.company.name}</h1>
            </div>
            <div className="flex gap-3 items-center flex-wrap">
              {ApplicationCompanyInfo.map((data) => renderIconText(data))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div>
            <Link href={`/jobs/${application?.job._id}`}>
              <h1 className="font-bold text-xl overflow-auto">
                {application?.job.title}
              </h1>
            </Link>
          </div>
          <div className="flex gap-6 items-center flex-wrap justify-between">
            {ApplicationJobInfo.map((data) => renderIconText(data))}
          </div>
          <div>
            {renderIconText({
              id: "1",
              icon: <CalendarCheck />,
              data: "Applied" + ` ${appliedDate}`,
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div
          className={`p-3 rounded-full border w-full overflow-auto text-center ${
            applicationStatusAccepted
              ? "bg-green-100 dark:bg-green-500"
              : applicationStatusRejected
              ? "bg-red-100 dark:bg-red-500"
              : applicationsStatusInterview
              ? "bg-yellow-100 dark:bg-yellow-500"
              : "bg-blue-100 dark:bg-blue-500"
          }`}
        >
          <p
            className={`
           ${
             applicationStatusAccepted
               ? "text-[--green-base-color]"
               : applicationStatusRejected
               ? "text-[--red-base-color]"
               : applicationsStatusInterview
               ? "text-yellow-100"
               : "text-[--blue-base-color]"
           }`}
          >
            {application?.status}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationsItem;
