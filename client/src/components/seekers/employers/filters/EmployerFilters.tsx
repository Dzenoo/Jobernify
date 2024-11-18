import React from "react";

import useSearchParams from "@/hooks/defaults/useSearchParams";

import { Button } from "@/components/ui/button";

enum EmployerType {
  reviews = "reviews",
  jobs = "jobs",
}

type EmployerTypeFilters = {
  type: keyof typeof EmployerType;
};

const EmployerFilters: React.FC<EmployerTypeFilters> = ({ type }) => {
  const { updateSearchParams } = useSearchParams();

  const FilterButtons = Array(
    {
      id: "1",
      title: "Jobs",
      filter: "jobs",
    },
    {
      id: "2",
      title: "Reviews",
      filter: "reviews",
    }
  );

  return (
    <div className="flex items-center gap-3">
      {FilterButtons.map((button) => (
        <Button
          key={button.id}
          variant={type === button.filter ? "default" : "outline"}
          onClick={() => updateSearchParams("section", button.filter)}
        >
          {button.title}
        </Button>
      ))}
    </div>
  );
};

export default EmployerFilters;
