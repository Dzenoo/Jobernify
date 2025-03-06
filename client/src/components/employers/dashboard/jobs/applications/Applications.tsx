import React from 'react';

import { LucideImage, Search } from 'lucide-react';

import { formatDate } from '@/lib/utils';

import { IApplication } from '@/types';

import NameWithImage from './table/NameWithImage';
import StatusBadge from './table/StatusBadge';
import CoverLetter from './table/CoverLetter';
import Resume from './table/Resume';
import SocialLinks from '@/components/employers/seekers/SocialLinks';
import GithubIcon from '@/components/shared/icons/GithubIcon';
import LinkedinIcon from '@/components/shared/icons/LinkedinIcon';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/utilities/table';

type ApplicationsProps = {
  applications: IApplication[];
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
          <h2 className="text-lg font-semibold">No Applications Found</h2>
        </div>
        <div>
          <p className="text-muted-foreground dark:text-muted-foreground">
            You don't have new applications
          </p>
        </div>
      </div>
    );

  const columns = [
    'Index',
    'Name',
    'Headline',
    'Email',
    'Resume',
    'Cover Letter',
    'Applied',
    'Status',
    'Socials',
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead className="whitespace-nowrap" key={column}>
              {column}
            </TableHead>
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
            <TableCell>{app.seeker.headline}</TableCell>
            <TableCell>
              <a href={`mailto:${app.seeker.email}`}>{app.seeker.email}</a>
            </TableCell>
            <TableCell>
              <Resume applicationId={app._id} />
            </TableCell>
            <TableCell>
              <CoverLetter cover_letter={app.cover_letter} />
            </TableCell>
            <TableCell>{formatDate(app.createdAt)}</TableCell>
            <TableCell>
              <StatusBadge applicationId={app._id} status={app.status} />
            </TableCell>
            <TableCell>
              <SocialLinks
                className="flex-nowrap"
                links={[
                  {
                    id: '1',
                    href: app.seeker?.portfolio,
                    icon: <LucideImage />,
                    label: 'Portfolio',
                  },
                  {
                    id: '2',
                    href: app.seeker?.github,
                    icon: <GithubIcon />,
                    label: 'Github',
                  },
                  {
                    id: '3',
                    href: app.seeker?.linkedin,
                    icon: <LinkedinIcon />,
                    label: 'Linkedin',
                  },
                ]}
              />
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
