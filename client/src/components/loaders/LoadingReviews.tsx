const LoadingReviewsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 10 }).map((_job, ind) => (
        <div
          key={ind}
          className="flex flex-col gap-6 animate-pulse bg-gray-100 p-6 rounded-lg w-full"
        >
          <div className="animate-pulse h-4 bg-gray-300 rounded w-60"></div>
          <div className="flex flex-col gap-3">
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28"></div>
            <div className="flex flex-col gap-3">
              <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
              <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
              <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28"></div>
            <div className="flex flex-col gap-3">
              <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
              <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
              <div className="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28"></div>
            <div className="animate-pulse h-4 bg-gray-300 rounded w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingReviewsSkeleton;
