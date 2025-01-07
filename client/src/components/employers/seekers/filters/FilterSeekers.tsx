'use client';

import React, { useState } from 'react';

import { ListFilter } from 'lucide-react';

import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';
import { injectCountsIntoFilters } from '@/lib/utils';
import { SkillsInformationsData } from '@/constants';
import { FilterCounts } from '@/types';

import FilterHandler from '@/components/shared/features/filters/FilterHandler';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/layout/drawer';
import { Button } from '@/components/ui/buttons/button';
import { Card, CardContent } from '@/components/ui/layout/card';

type FilterSeekersProps = {
  filterCounts: FilterCounts;
};

const FilterSeekers: React.FC<FilterSeekersProps> = ({ filterCounts }) => {
  const isLarge = useMediaQuery('(min-width: 1280px)');
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden xl:block">
        <Card>
          <CardContent>
            <FiltersContent filterCounts={filterCounts} />
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
                <FiltersContent filterCounts={filterCounts} />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
};

const FiltersContent: React.FC<{ filterCounts: FilterCounts }> = ({
  filterCounts,
}) => {
  const transformedSkillsInformationsData = SkillsInformationsData.map(
    (item) => ({
      id: item.id,
      title: item.category,
      description: item.description,
      data: item.data,
    }),
  );

  const typeToCountMapForSeekers = {
    skills: 'skills',
  };

  const updatedJobsFiltersData = injectCountsIntoFilters(
    transformedSkillsInformationsData,
    filterCounts,
    typeToCountMapForSeekers,
  );

  return (
    <div className="flex flex-col gap-5">
      {updatedJobsFiltersData.map((filterGroup) => (
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
