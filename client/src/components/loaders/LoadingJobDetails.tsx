import React from "react";
import LoadingJobsSkeleton from "./LoadingJobsSkeleton";

const LoadingJobDetails = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between animate-pulse rounded-lg p-4 gap-6">
      <div className="w-full lg:basis-[38em] flex flex-col gap-6">
        <div>
          <div className="w-full h-4 rounded-xl bg-gray-300"></div>
        </div>
        <div>
          <div className="w-full h-4 rounded-xl bg-gray-300"></div>
        </div>
        <div>
          <div className="w-full h-10 rounded-xl bg-gray-300"></div>
        </div>
      </div>
      <div className="w-full lg:basis-full lg:grow flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
          <div className="flex items-center gap-3">
            <div>
              <div className="w-16 h-16 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-4 bg-gray-300 rounded w-60"></div>
              <div className="flex gap-3">
                <div className="h-4 bg-gray-300 rounded w-36"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <div className="h-10 bg-gray-300 rounded w-28"></div>
            <div className="h-10 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-40 h-4 rounded-full bg-gray-300"></div>
          <div className="flex flex-wrap items-center gap-3">
            {Array.from({ length: 3 }).map((_item, ind) => (
              <div
                key={ind}
                className="w-full sm:w-40 h-4 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_item, ind) => (
              <div
                key={ind}
                className="w-full h-40 rounded-xl bg-gray-300"
              ></div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_item, ind) => (
            <div key={ind} className="w-full h-4 rounded-xl bg-gray-300"></div>
          ))}
        </div>
      </div>
      <div className="w-full lg:basis-1/2">
        <div className="flex flex-col gap-6">
          <LoadingJobsSkeleton />
        </div>
      </div>
    </div>
  );
};

export default LoadingJobDetails;
