import React from "react";

const LoadingDashboard = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-[3px]">
        <div>
          <h1 className="text-base-black animate-pulse bg-gray-300 h-5 w-52"></h1>
        </div>
        <div>
          <p className="text-initial-gray animate-pulse bg-gray-300 h-4 w-1/3"></p>
        </div>
      </div>
      <div className="grid gap-3 grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <div className="animate-pulse bg-gray-300 h-32 w-full rounded"></div>
        </div>
        <div>
          <div className="animate-pulse bg-gray-300 h-32 w-full rounded"></div>
        </div>
        <div>
          <div className="animate-pulse bg-gray-300 h-32 w-full rounded"></div>
        </div>
        <div>
          <div className="animate-pulse bg-gray-300 h-32 w-full rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-3">
        <div className="animate-pulse bg-gray-300 h-72 w-full rounded"></div>
        <div className="animate-pulse bg-gray-300 h-72 w-full rounded"></div>
        <div className="animate-pulse bg-gray-300 h-72 w-full rounded"></div>
      </div>
      <div></div>
    </div>
  );
};

export default LoadingDashboard;
