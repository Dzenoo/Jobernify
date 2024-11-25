import React from "react";

import useSearchParams from "@/hooks/defaults/useSearchParams.hook";

type SeekerProfileNavigationProps = {
  section: string;
};

const SeekerProfileNavigation: React.FC<SeekerProfileNavigationProps> = ({
  section,
}) => {
  const { updateSearchParams } = useSearchParams();

  const SeekerNavList = [
    {
      id: "1",
      title: "Personal Information",
      params: "",
    },
    {
      id: "2",
      title: "Job Alerts",
      params: "alerts",
    },
    {
      id: "3",
      title: "Saved Jobs",
      params: "saved",
    },
    {
      id: "4",
      title: "My Applications",
      params: "applications",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-base-black">Profile</h1>
      </div>
      <div className="flex items-center gap-3 overflow-auto hide-scrollbar">
        {SeekerNavList.map((item) => (
          <button
            className={`transition cursor-pointer hover:text-blue-700 whitespace-nowrap ${
              section === item.params ? "text-blue-700" : ""
            }`}
            key={item.id}
            onClick={() => updateSearchParams("section", item.params)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeekerProfileNavigation;
