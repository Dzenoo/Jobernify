import React from 'react';

const LoadingDashboard = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-[3px]">
        <div>
          <h1 className="text-base-black animate-pulse bg-gray-300 rounded-xl h-5 w-52"></h1>
        </div>
        <div>
          <p className="text-muted-foreground animate-pulse bg-gray-300 rounded-xl h-4 w-1/3"></p>
        </div>
      </div>
      <div className="grid gap-3 grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div>
          <div className="animate-pulse bg-gray-300 h-32 w-full rounded-xl"></div>
        </div>
        <div>
          <div className="animate-pulse bg-gray-300 h-32 w-full rounded-xl"></div>
        </div>
        <div className="max-lg:col-span-2 max-sm:col-span-1">
          <div className="animate-pulse bg-gray-300 h-32 w-full rounded-xl"></div>
        </div>
      </div>
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-3">
        <div className="animate-pulse bg-gray-300 h-72 w-full rounded-xl"></div>
        <div className="animate-pulse bg-gray-300 h-72 w-full rounded-xl"></div>
        <div className="animate-pulse bg-gray-300 h-72 w-full rounded-xl"></div>
      </div>
      <div></div>
    </div>
  );
};

export default LoadingDashboard;
