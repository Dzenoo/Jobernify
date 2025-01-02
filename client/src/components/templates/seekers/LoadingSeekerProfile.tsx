const LoadingSeekerProfileSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 animate-pulse bg-gray-100 p-6 rounded-xl mx-40 max-xl:mx-0">
      <div className="flex justify-between gap-3">
        <div className="flex gap-10 max-sm:flex-col sm:items-center">
          <div className="w-28 h-28 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-36"></div>
            <div className="h-4 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
        <div>
          <div className="h-10 bg-gray-300 rounded w-36 max-sm:w-10"></div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="h-4 bg-gray-300 rounded w-28"></div>
          <div className="h-4 bg-gray-300 rounded w-28"></div>
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
      <div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </div>
      </div>
      <div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </div>
      </div>
      <div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSeekerProfileSkeleton;
