'use client';

import React, { useState } from 'react';

import { ListFilter } from 'lucide-react';

import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';
import { SkillsInformationsData } from '@/constants';

import FilterHandler from '@/components/shared/filters/FilterHandler';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FilterSeekers: React.FC = () => {
  const isLarge = useMediaQuery('(min-width: 1280px)');
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden xl:block">
        <Card>
          <CardContent>
            <FiltersContent />
          </CardContent>
        </Card>
      </div>
      <div className="xl:hidden">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-center gap-2"
        >
          <ListFilter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        {!isLarge && (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Filter seekers by skills to find the best candidates.
                </DrawerDescription>
              </DrawerHeader>
              <div className="hide-scrollbar overflow-auto p-5 space-y-6 mt-4 h-96">
                <FiltersContent />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
};

const FiltersContent: React.FC = () => {
  const transformedSkillsInformationsData = SkillsInformationsData.map(
    (item) => ({ id: item.id, title: item.category, data: item.data }),
  );

  return (
    <div className="flex flex-col gap-5">
      {transformedSkillsInformationsData.map((filterGroup) => (
        <FilterHandler
          key={filterGroup.id}
          filterGroups={[filterGroup]}
          showCount={true}
        />
      ))}
    </div>
  );
};

export default FilterSeekers;
