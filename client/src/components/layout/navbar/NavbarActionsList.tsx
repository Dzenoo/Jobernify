import React from 'react';

import { useRouter } from 'next/navigation';
import { LogOut, LucideIcon } from 'lucide-react';

import { useAuth } from '@/hooks/core/useAuth.hook';

import Ai from '@/components/shared/features/ai/Ai';
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
  pathname: string;
};

const NavbarActionsList: React.FC<NavbarActionsListProps> = ({
  isSeeker,
  data,
  pathname,
}) => {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <ul className="flex items-center gap-4">
      <Ai isSeeker={isSeeker} />

      {Array.from(data).map(({ id, href, icon, tooltip }) => (
        <TooltipWrapper key={id} tooltip={tooltip}>
          <button
            className={`flex items-center gap-3 transition-colors hover:text-blue-700 ${
              pathname === href && 'text-[#0066ff]'
            }`}
            onClick={() => router.push(href)}
          >
            {React.createElement(icon)}
          </button>
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
