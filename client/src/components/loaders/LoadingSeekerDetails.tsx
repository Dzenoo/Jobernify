const LoadingSeekerDetails: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-10 animate-pulse bg-gray-100 p-6 rounded-lg w-full">
        <div className="flex gap-3 items-center">
          <div className="w-28 h-28 rounded-full bg-gray-300"></div>
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="flex gap-3">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-52"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-52"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-52"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-52"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSeekerDetails;
