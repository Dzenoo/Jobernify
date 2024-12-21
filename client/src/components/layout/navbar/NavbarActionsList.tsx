import React from 'react';

import Link from 'next/link';
import { LogOut, LucideIcon } from 'lucide-react';

import Ai from '@/components/shared/ai/Ai';
import Themes from './Themes';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type NavbarActionsListProps = {
  data: {
    id: string;
    href: string;
    icon: LucideIcon;
    tooltip: string;
  }[];
  logout: () => void;
  pathname: string;
};

const NavbarActionsList: React.FC<NavbarActionsListProps> = ({
  data,
  logout,
  pathname,
}) => {
  return (
    <ul className="flex items-center gap-4">
      <Ai />
      {Array.from(data).map(({ id, href, icon, tooltip }) => (
        <TooltipProvider key={id} delayDuration={400}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                key={id}
                href={href}
                className={`flex items-center gap-3 transition-colors hover:text-blue-700 ${
                  pathname === href && 'text-[#0066ff]'
                }`}
              >
                {React.createElement(icon)}
              </Link>
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      <div>
        <Themes />
      </div>
      <button onClick={logout}>
        <LogOut />
      </button>
    </ul>
  );
};

export default NavbarActionsList;
