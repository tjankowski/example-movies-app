const MovieCardSkeleton = () => {
  return (
    <div
      data-testid="movie-card-skeleton"
      className="animate-pulse flex rounded-md overflow-hidden h-[200px] bg-white shadow-lg border border-gray-100 p-4"
    >
      <div className="bg-gray-200 rounded-md w-[100px] h-[150px]"></div>
      <div className="flex flex-col flex-grow p-4 overflow-hidden space-y-2">
        <div className="bg-gray-200 h-7 w-1/2"></div>
        <div className="bg-gray-200 h-5 w-1/2"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
