"use client";

import React, { useState } from "react";

import { Filter, ListFilter } from "lucide-react";

import useMediaQuery from "@/hooks/defaults/useMediaQuery.hook";
import { SkillsInformationsData } from "@/constants";

import FilterHandler from "@/components/shared/filters/FilterHandler";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FilterSeekers: React.FC = () => {
  const isLarge = useMediaQuery("(min-width: 1280px)");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="hidden lg:block">
        <Card>
          <CardContent>
            <FiltersContent />
          </CardContent>
        </Card>
      </div>
      <div className="lg:hidden">
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
                <DrawerTitle>Seeker Filters</DrawerTitle>
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
    (item) => ({ id: item.id, title: item.category, data: item.data })
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center gap-5 max-xl:hidden">
        <div>
          <h1 className="text-xl font-bold">Seeker Filters</h1>
        </div>
        <div>
          <Filter />
        </div>
      </div>
      <div>
        {transformedSkillsInformationsData.map((filterGroup) => (
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

export default FilterSeekers;
