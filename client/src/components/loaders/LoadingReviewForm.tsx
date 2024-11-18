const LoadingReviewForm: React.FC = () => {
  return (
    <div className="p-10 flex flex-col gap-10 bg-gray-50 animate-pulse">
      {Array.from({ length: 6 }).map((_item, ind) => (
        <div key={ind}>
          <div>
            <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingReviewForm;
