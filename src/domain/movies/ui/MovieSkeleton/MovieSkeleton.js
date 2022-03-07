const MovieSkeleton = () => {
  return (
    <div data-testid="movie-skeleton" className="animate-pulse flex flex-col">
      <div className="bg-gray-200 rounded-md h-[300px]"></div>
      <div className="my-8 grid md:grid-cols-2 grid-cols-1 gap-8">
        <div className="bg-gray-200 rounded-md h-[150px]"></div>
        <div className="bg-gray-200 rounded-md h-[150px]"></div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
