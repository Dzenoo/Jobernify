const LoadingJobsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_job, ind) => (
        <div
          key={ind}
          className="animate-pulse bg-gray-100 rounded-lg p-4 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3 justify-between">
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
            <div className="h-10 bg-gray-300 rounded w-10"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
          </div>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <div className="h-3 bg-gray-300 rounded w-16"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
            <div>
              <div className="h-3 bg-gray-300 rounded w-10"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingJobsSkeleton;
