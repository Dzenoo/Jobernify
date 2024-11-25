import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Github, ImageIcon, Linkedin, Search } from "lucide-react";
import { useMutation } from "react-query";
import { AWS_URL } from "@/constants";
import { useToast } from "@/components/ui/use-toast";

import { updateApplicationStatus } from "@/lib/actions/applications.actions";
import { formatDate, getImageUrl } from "@/lib/utils";
import useAuthentication from "@/hooks/defaults/useAuthentication.hook";
import { queryClient } from "@/context/react-query-client";
import { ApplicationsTypes, SeekerTypes } from "@/types";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NameWithImage = ({ seeker }: { seeker: SeekerTypes }) => (
  <div className="flex items-center gap-3">
    <Image
      width={30}
      height={30}
      className="rounded-full object-cover"
      src={getImageUrl(seeker.image)}
      alt={`${seeker.first_name} ${seeker.last_name}`}
    />
    <div>
      <h1>
        {seeker.first_name} {seeker.last_name}
      </h1>
    </div>
  </div>
);

const StatusBadge = ({
  applicationId,
  status,
}: {
  applicationId: string;
  status: "Pending" | "Interview" | "Accepted" | "Rejected";
}) => {
  const { toast } = useToast();

  const { token } = useAuthentication().getCookieHandler();

  const { mutateAsync: updateStatusMutate } = useMutation({
    mutationFn: (status: string) =>
      updateApplicationStatus(applicationId, token!, status),
    onSuccess: () => {
      window.location.reload;
      queryClient.invalidateQueries(["applications"]);
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
      color: statusClasses.Pending,
      filter: "Pending",
    },
    {
      id: 2,
      title: "Interview",
      color: statusClasses.Interview,
      filter: "Interview",
    },
    {
      id: 3,
      title: "Accepted",
      color: statusClasses.Accepted,
      filter: "Accepted",
    },
    {
      id: 4,
      title: "Rejected",
      color: statusClasses.Rejected,
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
          {StatusButtons.map(({ id, title, color, filter }) => (
            <Button
              key={id}
              variant="outline"
              onClick={() => updateStatusApi(filter)}
              className={color}
            >
              {title}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const SocialLinks = ({ seeker }: { seeker: SeekerTypes }) => (
  <div className="flex items-center gap-6">
    {seeker.github === "" ? (
      <div className="text-initial-gray cursor-not-allowed">
        <Github />
      </div>
    ) : (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={`https://${seeker.github}`}
      >
        <Github />
      </Link>
    )}
    {seeker.linkedin === "" ? (
      <div className="text-initial-gray cursor-not-allowed">
        <Linkedin />
      </div>
    ) : (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={`https://${seeker.linkedin}`}
      >
        <Linkedin />
      </Link>
    )}
    {seeker.portfolio === "" ? (
      <div className="text-initial-gray cursor-not-allowed">
        <ImageIcon />
      </div>
    ) : (
      <Link
        target="_blank"
        rel="noopener noreferrer"
        href={`https://${seeker.portfolio}`}
      >
        <ImageIcon />
      </Link>
    )}
  </div>
);

type ApplicationsProps = {
  applications: ApplicationsTypes[];
  currentPage: number;
  itemsPerPage: number;
};

const Applications: React.FC<ApplicationsProps> = ({
  applications,
  currentPage,
  itemsPerPage,
}) => {
  if (applications?.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-6">
        <div>
          <Search size={50} className="mb-4" />
        </div>
        <div>
          <h2 className="text-lg font-semibold ">No Applications Found</h2>
        </div>
        <div>
          <p className="text-gray-600">You don't have new applications</p>
        </div>
      </div>
    );

  const columns = [
    "Index",
    "Name",
    "Email",
    "Resume",
    "Cover Letter",
    "Applied",
    "Status",
    "Socials",
  ];

  return (
    <Table>
      <TableCaption>A list of applications</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app, index) => (
          <TableRow className="whitespace-nowrap" key={app._id}>
            <TableCell>
              {(currentPage - 1) * itemsPerPage + index + 1}
            </TableCell>
            <TableCell>
              <NameWithImage seeker={app.seeker} />
            </TableCell>
            <TableCell>{app.seeker.email}</TableCell>
            <TableCell>
              {app.resume ? (
                <Link href={`${AWS_URL}/${app.resume}`}>
                  View Seeker Resume
                </Link>
              ) : (
                "Resume Is Undefined"
              )}
            </TableCell>
            <TableCell>
              {app.cover_letter ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-initial-blue">
                      Read
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <h2 className="text-lg font-bold">Cover Letter</h2>
                    <p className="mt-2">{app.cover_letter}</p>
                  </DialogContent>
                </Dialog>
              ) : (
                "Cover Letter Unassigned"
              )}
            </TableCell>
            <TableCell>{formatDate(app.createdAt)}</TableCell>
            <TableCell>
              <StatusBadge applicationId={app._id} status={app.status} />
            </TableCell>
            <TableCell>
              <SocialLinks seeker={app.seeker} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={7}>Total Applications</TableCell>
          <TableCell className="text-right">{applications.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Applications;
