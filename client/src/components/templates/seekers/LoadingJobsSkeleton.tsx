const LoadingJobsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
      {Array.from({ length: 3 }).map((_job, ind) => (
        <div
          key={ind}
          className="animate-pulse bg-gray-100 rounded-xl p-4 flex flex-col gap-3 md:gap-4 lg:gap-5"
        >
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="w-16 h-16 rounded-full bg-gray-300 md:w-20 md:h-20 lg:w-24 lg:h-24"></div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="h-4 bg-gray-300 rounded w-36 md:w-80 lg:w-100"></div>
                <div className="flex gap-3">
                  <div className="h-4 bg-gray-300 rounded w-28 md:w-40 lg:w-44"></div>
                  <div className="h-4 bg-gray-300 rounded w-10 md:w-20 lg:w-24"></div>
                </div>
              </div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-10 md:w-12 lg:w-14"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-3 bg-gray-300 rounded w-full md:h-4 lg:h-5"></div>
            <div className="h-3 bg-gray-300 rounded w-full md:h-4 lg:h-5"></div>
            <div className="h-3 bg-gray-300 rounded w-full md:h-4 lg:h-5"></div>
          </div>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <div className="h-3 bg-gray-300 rounded w-16 md:w-20 lg:w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-16 md:w-20 lg:w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-16 md:w-20 lg:w-24"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-300 rounded w-10 md:w-12 lg:w-14"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingJobsSkeleton;
