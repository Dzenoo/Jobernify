const LoadingCompaniesSkeleton: React.FC = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 10 }).map((_job, ind) => (
        <div
          key={ind}
          className="flex flex-col gap-4 sm:gap-6 lg:gap-10 animate-pulse bg-gray-100 p-4 sm:p-5 lg:p-6 rounded-lg w-full"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="animate-pulse bg-gray-300 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full"></div>
            <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-3 flex-grow">
              <div className="animate-pulse h-4 bg-gray-300 rounded w-40 sm:w-48 lg:w-60"></div>
              <div className="animate-pulse h-8 sm:h-9 lg:h-10 bg-gray-300 rounded w-24 sm:w-26 lg:w-28"></div>
            </div>
          </div>
          <div className="flex justify-between gap-2 sm:gap-3">
            <div className="animate-pulse h-4 bg-gray-300 rounded w-20 sm:w-24 lg:w-28"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-20 sm:w-24 lg:w-28"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-20 sm:w-24 lg:w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCompaniesSkeleton;
