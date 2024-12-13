import React from "react";

type SeekerProfileNavigationProps = {
  onSearchParamsChange: (param: string, value: string) => void;
  currentTab: number;
  updateTab: (tab: number) => void;
};

const SeekerProfileNavigation: React.FC<SeekerProfileNavigationProps> =
  React.memo(({ onSearchParamsChange, currentTab, updateTab }) => {
    const SeekerNavList = [
      {
        id: 0,
        title: "Personal Information",
      },
      {
        id: 1,
        title: "Job Alerts",
      },
      {
        id: 2,
        title: "Saved Jobs",
      },
      {
        id: 3,
        title: "My Applications",
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
                currentTab === item.id ? "text-blue-700" : ""
              }`}
              key={item.id}
              onClick={() => {
                onSearchParamsChange("page", "");
                updateTab(item.id);
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    );
  });

export default SeekerProfileNavigation;
