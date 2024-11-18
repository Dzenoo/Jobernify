import React from "react";
import useSearchParams from "@/hooks/defaults/useSearchParams";
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
    updateSearchParams("type", filter);
  };

  return (
    <Card>
      <CardContent>
        <div className="flex items-center max-sm:overflow-auto gap-5 hide-scrollbar">
          <Button
            variant="outline"
            onClick={() => updateApplicationsFilters("")}
          >
            Seekers ({applicants})
          </Button>
          <Button
            className="border-yellow-500"
            variant="outline"
            onClick={() => updateApplicationsFilters("Pending")}
          >
            Pending ({pending})
          </Button>
          <Button
            className="border-blue-500"
            variant="outline"
            onClick={() => updateApplicationsFilters("Interview")}
          >
            Interviews ({interviews})
          </Button>
          <Button
            className="border-red-500"
            variant="outline"
            onClick={() => updateApplicationsFilters("Rejected")}
          >
            Rejected ({rejected})
          </Button>
          <Button
            className="border-green-500"
            variant="outline"
            onClick={() => updateApplicationsFilters("Accepted")}
          >
            Accepted ({accepted})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterApplications;
