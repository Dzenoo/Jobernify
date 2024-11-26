"use client";

import React, { useState } from "react";
import { Filter, ListFilter } from "lucide-react";

import FilterHandler from "@/components/shared/filters/FilterHandler";
import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import { JobsFiltersData } from "@/constants";
import { injectCountsIntoFilters } from "@/lib/utils";
import { FilterCounts } from "@/types";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FilterJobsProps = {
  filterCounts: FilterCounts;
};

const FilterJobs: React.FC<FilterJobsProps> = ({ filterCounts }) => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden lg:block">
        <Card>
          <CardContent>
            <FiltersContent filterCounts={filterCounts} />
          </CardContent>
        </Card>
      </div>
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full"
        >
          <ListFilter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        {!isLarge && (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Job Filters</DrawerTitle>
              </DrawerHeader>
              <div className="hide-scrollbar overflow-auto p-5 h-96">
                <FiltersContent filterCounts={filterCounts} />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
};

const FiltersContent: React.FC<{
  filterCounts: FilterCounts;
}> = ({ filterCounts }) => {
  const typeToCountMapForJobs = {
    type: "types",
    seniority: "seniority",
    salaryRange: "salaryRanges",
    position: "positions",
  };

  const updatedJobsFiltersData = injectCountsIntoFilters(
    JobsFiltersData,
    filterCounts,
    typeToCountMapForJobs
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center gap-5 max-xl:hidden">
        <div>
          <h1 className="text-xl font-bold">Job Filters</h1>
        </div>
        <div>
          <Filter />
        </div>
      </div>
      <div>
        {updatedJobsFiltersData.map((filterGroup) => (
          <FilterHandler
            key={filterGroup.id}
            filterGroups={[filterGroup]}
            showCount={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterJobs;
