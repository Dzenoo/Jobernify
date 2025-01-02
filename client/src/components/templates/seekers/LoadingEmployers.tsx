import React from 'react';
import { Camera, Briefcase, Building } from 'lucide-react';

const LoadingEmployerSkeleton: React.FC = () => {
  const skeletonItems = Array.from({ length: 10 });

  const footerSkeletonData = [
    { id: '1', icon: <Camera className="text-gray-300" />, width: 'w-24' },
    { id: '2', icon: <Briefcase className="text-gray-300" />, width: 'w-20' },
    { id: '3', icon: <Building className="text-gray-300" />, width: 'w-28' },
  ];

  return (
    <div className="grid gap-3 grid-cols-3 max-[1680px]:grid-cols-2 max-lg:grid-cols-1">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-5 p-6 bg-gray-100 dark:bg-[#1b1b1b] rounded-xl animate-pulse overflow-hidden"
        >
          <div className="flex justify-between gap-5 max-sm:flex-col">
            <div className="flex-shrink-0">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-28 h-28 max-sm:w-20 max-sm:h-20"></div>
            </div>
            <div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-xl w-24 h-10 max-sm:w-full"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-52"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-52"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-52"></div>
          </div>
          <div className="flex items-center justify-between gap-6 border-t border-gray-200 dark:border-gray-700 pt-6 whitespace-nowrap overflow-scroll hide-scrollbar">
            {footerSkeletonData.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div
                  className={`h-4 ${item.width} bg-gray-300 dark:bg-gray-700 rounded`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingEmployerSkeleton;
