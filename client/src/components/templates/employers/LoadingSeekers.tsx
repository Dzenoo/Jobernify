const LoadingSeekers: React.FC = () => {
  return (
    <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_item, ind) => (
        <div
          key={ind}
          className="flex flex-col gap-10 sm:gap-6 lg:gap-10 animate-pulse bg-gray-100 p-4 sm:p-5 lg:p-6 rounded-xl w-full items-center overflow-hidden"
        >
          <div className="w-36 h-36 rounded-full bg-gray-300"></div>
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <div className="h-4 bg-gray-300 rounded w-16 sm:w-20 lg:w-24"></div>
            <div className="h-4 bg-gray-300 rounded w-24 sm:w-28 lg:w-32"></div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <div className="h-8 bg-gray-300 rounded w-8"></div>
            <div className="h-8 bg-gray-300 rounded w-8"></div>
            <div className="h-8 bg-gray-300 rounded w-8"></div>
          </div>
          <div className="flex gap-5 whitespace-nowrap overflow-x-scroll hide-scrollbar">
            <div className="h-8 sm:h-9 lg:h-10 bg-gray-300 rounded-xl w-24 sm:w-28 lg:w-28"></div>
            <div className="h-8 sm:h-9 lg:h-10 bg-gray-300 rounded-xl w-24 sm:w-28 lg:w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSeekers;
