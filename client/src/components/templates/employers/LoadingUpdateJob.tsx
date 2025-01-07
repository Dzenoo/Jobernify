const LoadingUpdateJob: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-10 animate-pulse w-full p-28 max-md:grid-cols-1 max-md:p-5">
      <div className="flex flex-col gap-3">
        <div className="h-4 bg-gray-300 rounded w-12"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-52"></div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default LoadingUpdateJob;
