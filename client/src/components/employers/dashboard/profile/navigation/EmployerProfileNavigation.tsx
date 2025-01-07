import React from 'react';

import { Button } from '@/components/ui/buttons/button';

type EmployerProfileNavigationProps = {
  onSearchParamsChange: (param: string, value: string) => void;
  currentTab: number;
  updateTab: (tab: number) => void;
};

const EmployerProfileNavigation: React.FC<EmployerProfileNavigationProps> =
  React.memo(({ onSearchParamsChange, currentTab, updateTab }) => {
    const EmployerNavList = [
      {
        id: 0,
        title: 'Company Information',
      },
      {
        id: 1,
        title: 'Settings',
      },
    ];

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-base-black">Profile</h1>
        </div>
        <div className="flex items-center gap-2 overflow-auto hide-scrollbar">
          {EmployerNavList.map((item) => (
            <Button
              variant={currentTab === item.id ? 'outline' : 'ghost'}
              className={'whitespace-nowrap'}
              key={item.id}
              onClick={() => {
                onSearchParamsChange('page', '');
                updateTab(item.id);
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </div>
    );
  });

export default EmployerProfileNavigation;
