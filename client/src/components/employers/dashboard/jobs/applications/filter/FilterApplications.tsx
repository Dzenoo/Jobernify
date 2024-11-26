import React from "react";

import useSearchParams from "@/hooks/defaults/useSearchParams.hook";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FilterApplicationsProps = {
  applicants: number;
  pending: number;
  interviews: number;
  rejected: number;
  accepted: number;
};

const FilterApplications: React.FC<FilterApplicationsProps> = ({
  applicants,
  pending,
  interviews,
  rejected,
  accepted,
}) => {
  const { updateSearchParams } = useSearchParams();

  const updateApplicationsFilters = (filter: string) => {
    updateSearchParams("status", filter);
  };

  const FilterApplicationsButtons = [
    {
      id: 1,
      title: "Seekers",
      data: applicants,
      filter: "",
      color: "",
    },
    {
      id: 2,
      title: "Pending",
      data: pending,
      filter: "Pending",
      color: "border-yellow-500",
    },
    {
      id: 3,
      title: "Interviews",
      data: interviews,
      filter: "Interview",
      color: "border-blue-500",
    },
    {
      id: 4,
      title: "Rejected",
      data: rejected,
      filter: "Rejected",
      color: "border-red-500",
    },
    {
      id: 5,
      title: "Accepted",
      data: accepted,
      filter: "Accepted",
      color: "border-green-500",
    },
  ];

  return (
    <Card>
      <CardContent>
        <div className="flex items-center max-sm:overflow-auto gap-5 hide-scrollbar">
          {FilterApplicationsButtons.map(
            ({ id, title, data, filter, color }) => (
              <Button
                key={id}
                className={color}
                variant="outline"
                onClick={() => updateApplicationsFilters(filter)}
              >
                {title} ({data})
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterApplications;
