import React from "react";
import Link from "next/link";

import { Edit, Eye, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type JobOptionsProps = {
  jobId: string;
  onDeleteButton: (jobIds: string) => void;
};

const JobOptions: React.FC<JobOptionsProps> = ({ jobId, onDeleteButton }) => {
  const options = [
    {
      id: 1,
      icon: <Eye />,
      tooltip: "View Applications",
      link: `/dashboard/jobs/${jobId}`,
    },
    {
      id: 2,
      icon: <Edit />,
      tooltip: "Edit Job",
      link: `/dashboard/jobs/${jobId}/edit`,
    },
    {
      id: 3,
      icon: <Trash color="red" />,
      tooltip: "Delete Job",
      onClick: () => onDeleteButton(jobId),
    },
  ];

  return (
    <div className="flex items-center justify-between gap-3">
      {options.map(({ id, icon, tooltip, link, onClick }) => (
        <TooltipProvider delayDuration={400} key={id}>
          <Tooltip>
            <TooltipTrigger>
              {link ? (
                <Link href={link}>{icon}</Link>
              ) : (
                <button onClick={onClick}>{icon}</button>
              )}
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default JobOptions;
