import React, { useState } from 'react';

import { Job } from '@/types';
import { findLocationData, formatDate } from '@/lib/utils';

import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';
import DeleteJob from './table/DeleteJob';
import JobOptions from './table/JobOptions';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog } from '@/components/ui/dialog';
import { Drawer } from '@/components/ui/drawer';

type DashboardEmployerJobsProps = {
  jobs: Job[];
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

  const [openedJobId, setOpenedJobId] = useState<string>('');
  const isSmall = useMediaQuery('(min-width: 650px)');

  const openDeleteJob = (jobId: string) => {
    setOpenedJobId(jobId);
  };

  const closeDeleteJob = () => {
    setOpenedJobId('');
  };

  const columns = [
    'Index',
    'Title',
    'Type',
    'Level',
    'Position',
    'Location',
    'Salary',
    'Expiration Date',
    'Applications',
    'Options',
  ];

  return (
    <>
      {isSmall && (
        <Dialog open={!!openedJobId} onOpenChange={closeDeleteJob}>
          <DeleteJob
            onClose={closeDeleteJob}
            id={openedJobId}
            isDialog={true}
          />
        </Dialog>
      )}
      {!isSmall && (
        <Drawer open={!!openedJobId} onOpenChange={closeDeleteJob}>
          <DeleteJob
            onClose={closeDeleteJob}
            id={openedJobId}
            isDialog={false}
          />
        </Drawer>
      )}
      <Table>
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
              <TableCell className="bg-green-100 text-green-600 dark:bg-green-300 dark:text-green-900 p-3">
                {job.salary}$
              </TableCell>
              <TableCell className="bg-red-100 text-red-600 dark:bg-red-300 dark:text-red-900 p-3">
                {formatDate(job.expiration_date)}
              </TableCell>
              <TableCell className="bg-blue-100 text-blue-600 dark:bg-blue-300 dark:text-blue-900 p-3">
                {job.applications?.length ?? 0}
              </TableCell>
              <TableCell>
                <JobOptions jobId={job._id} onDelete={openDeleteJob} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9}>Total Jobs</TableCell>
            <TableCell className="text-right">{jobs.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default DashboardEmployerJobs;
