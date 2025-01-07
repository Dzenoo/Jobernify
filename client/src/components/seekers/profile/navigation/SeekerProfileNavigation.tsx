import React from 'react';

import { Button } from '@/components/ui/buttons/button';

type SeekerProfileNavigationProps = {
  onSearchParamsChange: (param: string, value: string) => void;
  currentTab: number;
  updateTab: (tab: number) => void;
};

const SeekerProfileNavigation: React.FC<SeekerProfileNavigationProps> =
  React.memo(({ onSearchParamsChange, currentTab, updateTab }) => {
    const SeekerNavList = [
      {
        id: 0,
        title: 'Personal Information',
      },
      {
        id: 1,
        title: 'Job Alerts',
      },
      {
        id: 2,
        title: 'Saved Jobs',
      },
      {
        id: 3,
        title: 'My Applications',
      },
      {
        id: 4,
        title: 'Settings',
      },
    ];

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-base-black">Profile</h1>
        </div>
        <div className="flex items-center gap-2 overflow-auto hide-scrollbar">
          {SeekerNavList.map((item) => (
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

export default SeekerProfileNavigation;
