import React from "react";

const LoadingPopularJobs: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="h-6 bg-gray-300 rounded w-48"></h1>
      </div>
      <div className="p-0 flex flex-col">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-100 rounded-none p-4 flex items-center justify-between"
          >
            <div className="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingPopularJobs;
