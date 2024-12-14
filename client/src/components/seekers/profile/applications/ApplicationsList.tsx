import React from "react";

import { Search } from "lucide-react";

import ApplicationsItem from "./ApplicationsItem";

import { ApplicationsTypes } from "@/types";

type ApplicationsListProps = {
  applications: ApplicationsTypes[];
};

const ApplicationsList: React.FC<ApplicationsListProps> = React.memo(
  ({ applications }) => {
    return (
      <div className="pt-0">
        {applications.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div>
              <Search size={50} className="mb-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold ">No Applications Found</h2>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                You haven't applied to any job
              </p>
            </div>
          </div>
        )}
        <div className="grid gap-3 grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {applications.map((application) => (
            <ApplicationsItem key={application._id} application={application} />
          ))}
        </div>
      </div>
    );
  }
);

export default ApplicationsList;
