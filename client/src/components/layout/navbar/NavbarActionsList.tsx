import React from 'react';

import Link from 'next/link';
import { LogOut, LucideIcon } from 'lucide-react';

import Ai from '@/components/shared/ai/Ai';
import Themes from './Themes';

import { TooltipWrapper } from '@/components/ui/info/tooltip-wrapper';

type NavbarActionsListProps = {
  isSeeker: boolean;
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
  isSeeker,
  data,
  logout,
  pathname,
}) => {
  return (
    <ul className="flex items-center gap-4">
      <Ai isSeeker={isSeeker} />

      {Array.from(data).map(({ id, href, icon, tooltip }) => (
        <TooltipWrapper key={id} tooltip={tooltip}>
          <Link
            key={id}
            href={href}
            className={`flex items-center gap-3 transition-colors hover:text-blue-700 ${
              pathname === href && 'text-[#0066ff]'
            }`}
          >
            {React.createElement(icon)}
          </Link>
        </TooltipWrapper>
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
