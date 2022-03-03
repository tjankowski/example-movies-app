import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "domain/movies/ui/MovieCard/MovieCard";
import MovieCardSkeleton from "domain/movies/ui/MovieCardSkeleton/MovieCardSkeleton";
import Paging from "domain/movies/ui/Paging/Paging";
import Layout from "ui/Layout/Layout";
import { useMovies } from "domain/movies/hooks/useMovies";
import { mockItems } from "utils/utils";

const PAGE_SIZE = 5;

const MovieListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"), 10) || 0;
  const { movies, loading } = useMovies(page);

  const changePageBy = (change) => {
    return () => setSearchParams({ page: page + change });
  };

  return (
    <Layout>
      <h1 className="text-xl mb-6">Latest recommendations</h1>
      <ul className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-2">
        {loading && mockItems(5).map((v) => <MovieCardSkeleton key={v} />)}
        {!loading &&
          movies.map((movie) => (
            <li key={movie.id}>
              <Link to={movie.id}>
                <MovieCard movie={movie} />
              </Link>
            </li>
          ))}
        {/* TODO We could handle here also empty state when there are no movies */}
      </ul>
      <Paging
        page={page}
        pageSize={PAGE_SIZE}
        collection={movies}
        onNextPage={changePageBy(1)}
        onPrevPage={changePageBy(-1)}
      />
    </Layout>
  );
};

export default MovieListPage;
