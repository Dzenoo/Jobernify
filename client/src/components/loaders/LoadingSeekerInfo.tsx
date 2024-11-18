import React from "react";

const LoadingSeekerInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10 animate-pulse bg-gray-100 p-4 sm:p-5 lg:p-6 rounded-lg w-full items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-300"></div>
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <div className="h-4 bg-gray-300 rounded w-24 sm:w-28 lg:w-32"></div>
        <div className="h-4 bg-gray-300 rounded w-16 sm:w-20 lg:w-24"></div>
        <div className="flex gap-2 sm:gap-3">
          <div className="h-4 bg-gray-300 rounded w-14 sm:w-16 lg:w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-14 sm:w-16 lg:w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSeekerInfo;
