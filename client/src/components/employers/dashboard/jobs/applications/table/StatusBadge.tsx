import React from "react";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/context/react-query-client";

import { updateApplicationStatus } from "@/lib/actions/applications.actions";

import useAuthentication from "@/hooks/defaults/useAuthentication.hook";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type StatusBadgeProps = {
  applicationId: string;
  status: "Pending" | "Interview" | "Accepted" | "Rejected";
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ applicationId, status }) => {
  const { toast } = useToast();
  const { token } = useAuthentication().getCookieHandler();

  const { mutateAsync: updateStatusMutate } = useMutation({
    mutationFn: (status: string) => {
      if (!token) {
        throw new Error("Unathorized!");
      }

      return updateApplicationStatus(applicationId, token, status);
    },
    onSuccess: () => {
      window.location.reload;
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error?.response?.data?.message });
    },
  });

  const updateStatusApi = async (status: string) => {
    await updateStatusMutate(status);
  };

  const statusClasses = {
    Pending: "bg-blue-100 text-blue-600",
    Interview: "bg-yellow-100 text-yellow-600",
    Accepted: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  const StatusButtons = [
    {
      id: 1,
      title: "Pending",
      className: statusClasses.Pending,
      filter: "Pending",
    },
    {
      id: 2,
      title: "Interview",
      className: statusClasses.Interview,
      filter: "Interview",
    },
    {
      id: 3,
      title: "Accepted",
      className: statusClasses.Accepted,
      filter: "Accepted",
    },
    {
      id: 4,
      title: "Rejected",
      className: statusClasses.Rejected,
      filter: "Rejected",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`rounded-full p-3 transition-colors cursor-pointer ${
            statusClasses[status] || ""
          }`}
        >
          {status}
        </div>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex flex-col gap-2">
          {StatusButtons.map(({ id, title, className, filter }) => (
            <Button
              key={id}
              variant="outline"
              onClick={() => updateStatusApi(filter)}
              className={className}
            >
              {title}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StatusBadge;
