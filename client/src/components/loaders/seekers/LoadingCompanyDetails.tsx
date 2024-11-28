const LoadingCompanyDetails: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-6 bg-gray-300 rounded w-48"></div>
      <div className="flex overflow-auto justify-between max-lg:flex-wrap">
        <div className="flex sm:items-center gap-3 max-sm:flex-col">
          <div className="w-36 h-36 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col gap-3">
            <div className="rounded-full bg-gray-300 p-3 w-24 h-6"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
            <div className="h-6 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
        <div className="items-start pt-5 flex flex-col justify-between gap-10 max-lg:basis-full">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="flex items-center justify-end gap-2 max-lg:justify-stretch max-lg:flex-wrap">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-6 bg-gray-300 rounded w-24"></div>
        <div className="h-6 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default LoadingCompanyDetails;
