"use client";

import React, { useState } from "react";

import useSearchParams from "@/hooks/defaults/useSearchParams.hook";

import { FilterGroup } from "@/types";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FilterHandlerProps {
  showCount: boolean;
  filterGroups: FilterGroup[];
  initialVisibleCount?: number;
}

const FilterHandler: React.FC<FilterHandlerProps> = ({
  showCount,
  filterGroups,
  initialVisibleCount = 5,
}) => {
  const [showAll, setShowAll] = useState(false);
  const { filters, checkboxSearchParams } = useSearchParams();

  const handleCheckboxChange = (
    checked: boolean,
    type: string,
    value: string
  ) => {
    checkboxSearchParams(type, value, checked ? "add" : "remove");
  };

  const handleShowMoreToggle = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <Accordion type="single" collapsible defaultValue="item-0">
      {filterGroups.map((filter, index) => {
        const visibleCheckboxes = showAll
          ? filter.data
          : filter.data.slice(0, initialVisibleCount);

        return (
          <AccordionItem key={filter.id} value={`item-${index}`}>
            <AccordionTrigger>
              <h3 className="text-lg font-semibold">{filter.title}</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5">
                {visibleCheckboxes.map((checkbox) => (
                  <div
                    key={checkbox.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`${checkbox.type}-${checkbox.value}`}
                      checked={
                        filters[checkbox.type]?.includes(checkbox.value) ||
                        false
                      }
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          checked as boolean,
                          checkbox.type,
                          checkbox.value
                        )
                      }
                    />
                    <div className="flex justify-between items-center gap-2 w-full">
                      <p className="flex justify-between gap-2 max-sm:flex-col text-sm font-medium leading-none cursor-pointer transition-all hover:text-gray-500 dark:hover:text-gray-500">
                        {checkbox.title}
                      </p>
                      {showCount && checkbox.count !== undefined && (
                        <p className="font-medium text-gray-400 text-sm">
                          ({checkbox.count})
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {filter.data.length > initialVisibleCount && (
                <button
                  className="mt-3 text-blue-500 text-sm cursor-pointer"
                  onClick={handleShowMoreToggle}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default FilterHandler;
