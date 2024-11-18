const LoadingApplicationsSkeleton: React.FC = () => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_item, ind) => (
        <div
          key={ind}
          className="flex flex-col gap-4 sm:gap-6 lg:gap-10 animate-pulse bg-gray-100 p-4 sm:p-5 lg:p-6 rounded-lg w-full"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-300"></div>
            <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-3">
              <div className="h-4 bg-gray-300 rounded w-24 sm:w-28 lg:w-32"></div>
              <div className="h-4 bg-gray-300 rounded w-16 sm:w-20 lg:w-24"></div>
              <div className="flex gap-2 sm:gap-3">
                <div className="h-4 bg-gray-300 rounded w-14 sm:w-16 lg:w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-14 sm:w-16 lg:w-20"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="h-4 bg-gray-300 rounded w-24 sm:w-28 lg:w-32"></div>
            <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
              <div className="h-4 bg-gray-300 rounded w-20 sm:w-24 lg:w-28"></div>
              <div className="h-4 bg-gray-300 rounded w-20 sm:w-24 lg:w-28"></div>
              <div className="h-4 bg-gray-300 rounded w-20 sm:w-24 lg:w-28"></div>
            </div>
          </div>
          <div>
            <div className="h-8 sm:h-9 lg:h-10 bg-gray-300 rounded-full w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingApplicationsSkeleton;
