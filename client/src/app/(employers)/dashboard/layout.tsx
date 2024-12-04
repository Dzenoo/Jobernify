import React from "react";

import EmployersDashboardNavbar from "@/components/employers/dashboard/navbar/EmployersDashboardNavbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <EmployersDashboardNavbar />
      <div className="basis-full p-6 overflow-hidden">{children}</div>
    </div>
  );
};

export default DashboardLayout;
