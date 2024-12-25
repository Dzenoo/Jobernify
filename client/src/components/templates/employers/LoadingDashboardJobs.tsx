const LoadingDashboardJobs: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 6 }).map((_item, ind) => (
        <div
          key={ind}
          className="flex flex-col gap-10 animate-pulse bg-gray-100 p-6 w-full"
        >
          <div className="flex gap-3 items-center justify-between">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingDashboardJobs;
