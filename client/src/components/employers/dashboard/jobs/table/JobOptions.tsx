import React, { useState } from 'react';

import Link from 'next/link';

import { Edit, Eye, Trash, MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

type JobOptionsProps = {
  jobId: string;
  onDelete: (jobId: string) => void;
};

type MenuOption = {
  id: number;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  asLink?: boolean;
  href?: string;
};

const JobOptions: React.FC<JobOptionsProps> = ({ jobId, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeDropdown = () => setDropdownOpen(false);

  const options: MenuOption[] = [
    {
      id: 1,
      label: 'View Applications',
      icon: <Eye className="w-4 h-4 text-blue-600" />,
      action: closeDropdown,
      asLink: true,
      href: `/dashboard/jobs/${jobId}`,
    },
    {
      id: 2,
      label: 'Edit Job',
      icon: <Edit className="w-4 h-4 text-green-600" />,
      action: closeDropdown,
      asLink: true,
      href: `/dashboard/jobs/${jobId}/edit`,
    },
    {
      id: 3,
      label: 'Delete Job',
      icon: <Trash className="w-4 h-4 text-red-600" />,
      action: () => {
        closeDropdown();
        onDelete(jobId);
      },
    },
  ];
  return (
    <div>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="cursor-pointer w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {options.map(({ id, label, icon, action, asLink, href }) => (
            <DropdownMenuItem
              key={id}
              asChild={asLink}
              onClick={!asLink ? action : undefined}
            >
              {asLink && href ? (
                <Link href={href} className="flex items-center gap-2">
                  {icon}
                  {label}
                </Link>
              ) : (
                <button
                  onClick={action}
                  className="cursor-default flex items-center gap-2 w-full text-left"
                >
                  {icon}
                  {label}
                </button>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default JobOptions;
