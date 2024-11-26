import React from "react";

import Link from "next/link";

import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";

import {
  Building,
  Calendar,
  CircleDollarSignIcon,
  GraduationCap,
  LayoutTemplate,
  MapPinIcon,
  Timer,
} from "lucide-react";

import useGetSeeker from "@/hooks/queries/useGetSeeker.query";

import SaveJobButton from "../SaveJobButton";
import Navigator from "@/components/ui/navigator";

import { renderIconText, renderSkills } from "@/helpers";
import {
  findIndustriesData,
  findLocationData,
  formatDate,
  getImageUrl,
  getSkillsData,
  getTime,
} from "@/lib/utils";

import { ApplicationsTypes, JobTypes } from "@/types";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type JobDetailsInfoProps = {
  job: JobTypes;
  onApplyJob?: () => void;
};

const JobDetailsInfo: React.FC<JobDetailsInfoProps> = ({ job, onApplyJob }) => {
  const { data: fetchedSeekerProfile } = useGetSeeker();

  const sanitizedDescription = DOMPurify.sanitize(job?.description);
  const expirationDate = formatDate(job?.expiration_date);
  const createdTime = getTime(job?.createdAt);
  const categorizedSkills = getSkillsData(job?.skills);

  const CompanyInformationsData = [
    {
      tooltip: "Location",
      id: "1",
      icon: <MapPinIcon color="gray" />,
      data: job?.company.address || findLocationData(job?.location),
    },
    {
      tooltip: "Size",
      id: "2",
      icon: <LayoutTemplate color="gray" />,
      data: job?.company.size,
    },
  ];

  const JobInformationsData = [
    {
      tooltip: "Created At",
      id: "1",
      icon: <Calendar color="gray" />,
      data: createdTime,
    },
    {
      tooltip: "Expires At",
      id: "2",
      icon: <Timer color="gray" />,
      data: expirationDate,
    },
    {
      tooltip: "Applicants",
      id: "3",
      icon: <GraduationCap color="gray" />,
      data: job?.applications.length + " Applications",
    },
  ];

  const JobDetailsData = [
    {
      id: "1",
      icon: <Calendar color="gray" />,
      data: job?.position,
      title: "Position",
    },
    {
      id: "2",
      icon: <Timer color="gray" />,
      data: job?.type,
      title: "Time",
    },
    {
      id: "3",
      icon: <GraduationCap color="gray" />,
      data: job?.level,
      title: "Level",
    },
    {
      id: "4",
      icon: <CircleDollarSignIcon color="green" />,
      data: job?.salary + `$/month`,
      title: "Salary",
    },
  ];

  const isAppliedJob = fetchedSeekerProfile?.seeker.applications.find(
    (application: ApplicationsTypes) => application.job._id === job._id
  );

  return (
    <div className="flex flex-col gap-3">
      <Navigator info="Jobs" href={"/jobs"} title={job?.title} />
      <Card>
        <CardHeader>
          <div className="flex justify-between gap-6 max-md:flex-col">
            <div className="flex gap-3 max-sm:flex-col sm:items-center">
              <Link href={`/companies/${job?.company._id}?section=jobs`}>
                <Avatar className="border border-blue-900 w-28 h-28">
                  <AvatarImage
                    src={getImageUrl(job.company?.image)}
                    className="object-cover w-auto h-auto"
                  />
                </Avatar>
              </Link>
              <div className="flex flex-col gap-3">
                <div>
                  <Link href={`/companies/${job?.company._id}?section=jobs`}>
                    <h3 className="text-initial-black">{job?.company.name}</h3>
                  </Link>
                </div>
                {renderIconText({
                  tooltip: true,
                  tooltipContent: "Industry",
                  id: "3",
                  icon: <Building color="gray" />,
                  data: findIndustriesData(job?.company.industry),
                })}
                <div className="flex items-center gap-3 flex-wrap">
                  {CompanyInformationsData.map((data) =>
                    renderIconText({
                      ...data,
                      tooltip: true,
                      tooltipContent: data.tooltip,
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="basis-full">
                <Button
                  className="w-full px-6"
                  variant={isAppliedJob ? "outline" : "default"}
                  onClick={onApplyJob}
                  disabled={isAppliedJob !== undefined}
                >
                  {isAppliedJob ? "Already Applied" : "Apply to Job"}
                </Button>
              </div>
              <SaveJobButton jobId={job?._id} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-0">
          <div>
            <h1 className="text-base-black font-bold">{job?.title}</h1>
          </div>
          <div className="flex items-center gap-6 max-sm:justify-between max-sm:flex-wrap">
            {JobInformationsData.map((data) =>
              renderIconText({
                ...data,
                tooltip: true,
                tooltipContent: data.tooltip,
              })
            )}
          </div>
          <div className="px-10 border border-[--blue-base-color] rounded-xl flex items-center gap-6 justify-between py-4 max-sm:flex-col">
            {JobDetailsData.map((data) => renderJobDetails(data))}
          </div>
          <div>
            <div>
              <h1 className="font-bold">Overview</h1>
            </div>
            <div className="py-3">
              <p>{job?.overview}</p>
            </div>
          </div>
          <div>
            <div>
              <h1 className="font-bold">Description</h1>
            </div>
            <div>
              <ReactMarkdown className="jobDescription">
                {sanitizedDescription}
              </ReactMarkdown>
            </div>
          </div>
          <div>
            <div>
              <h1 className="font-bold">Skills</h1>
            </div>
            {renderSkills(categorizedSkills)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const renderJobDetails = <
  T extends {
    id: string;
    icon: React.JSX.Element;
    title: string;
    data: string | number;
  }
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
        <h1 className="font-bold">{data}</h1>
      </div>
      <div>
        <p className="text-initial-gray">{title}</p>
      </div>
    </div>
  );
};

export default JobDetailsInfo;
