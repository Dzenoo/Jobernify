import React from "react";

import { Search } from "lucide-react";

import { formatDate } from "@/lib/utils";

import { ApplicationsTypes } from "@/types";

import NameWithImage from "./table/NameWithImage";
import StatusBadge from "./table/StatusBadge";
import SocialLinks from "./table/SocialLinks";
import CoverLetter from "./table/CoverLetter";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Resume from "./table/Resume";

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
      <div className="flex flex-col items-center justify-center gap-2 py-10">
        <div>
          <Search size={50} className="mb-4" />
        </div>
        <div>
          <h2 className="text-lg font-semibold ">No Applications Found</h2>
        </div>
        <div>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have new applications
          </p>
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
            <TableCell>
              <a href={`mailto:${app.seeker.email}`}>{app.seeker.email}</a>
            </TableCell>
            <TableCell>
              <Resume resume={app.resume} />
            </TableCell>
            <TableCell>
              <CoverLetter cover_letter={app.cover_letter} />
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
