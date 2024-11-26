import React, { useState } from "react";

import { JobTypes } from "@/types";
import { findLocationData, formatDate } from "@/lib/utils";

import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import DeleteJob from "./table/DeleteJob";
import JobOptions from "./table/JobOptions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Drawer } from "@/components/ui/drawer";

type DashboardEmployerJobsProps = {
  jobs: JobTypes[];
  currentPage: number;
  itemsPerPage: number;
};

const DashboardEmployerJobs: React.FC<DashboardEmployerJobsProps> = ({
  jobs,
  currentPage,
  itemsPerPage,
}) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center flex items-center justify-center h-screen overflow-hidden">
        <p className="text-initial-gray">You haven't created any jobs yet.</p>
      </div>
    );
  }

  const [openedJobId, setOpenedJobId] = useState<string>("");
  const isLarge = useMediaQuery("(min-width: 1280px)");

  const openDeleteJob = (jobId: string) => {
    setOpenedJobId(jobId);
  };

  const closeDeleteJob = () => {
    setOpenedJobId("");
  };

  const columns = [
    "Index",
    "Title",
    "Type",
    "Level",
    "Position",
    "Location",
    "Salary",
    "Expiration Date",
    "Applications",
    "Options",
  ];

  return (
    <>
      {isLarge && (
        <Dialog open={!!openedJobId} onOpenChange={closeDeleteJob}>
          <DeleteJob
            onClose={closeDeleteJob}
            ids={openedJobId}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isLarge && (
        <Drawer open={!!openedJobId} onOpenChange={closeDeleteJob}>
          <DeleteJob
            onClose={closeDeleteJob}
            ids={openedJobId}
            isDialog={false}
          />
        </Drawer>
      )}
      <Table>
        <TableCaption>A list of your jobs</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, ind) => (
            <TableRow className="whitespace-nowrap" key={job._id}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + ind + 1}
              </TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.type}</TableCell>
              <TableCell>{job.level}</TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell>{findLocationData(job.location)}</TableCell>
              <TableCell className="bg-green-100 dark:text-green-600 text-green-600 p-3">
                {job.salary}$
              </TableCell>
              <TableCell className="bg-red-100 dark:text-red-600 text-red-600 p-3">
                {formatDate(job.expiration_date)}
              </TableCell>
              <TableCell className="bg-blue-100 dark:text-blue-600 text-blue-600 p-3">
                {job.applications?.length ?? 0}
              </TableCell>
              <TableCell>
                <JobOptions jobId={job._id} onDeleteButton={openDeleteJob} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DashboardEmployerJobs;
