import { BiCaretDown, BiCaretUp, BiChevronLeft } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import Button, { Variants } from "ui/Button/Button";
import Layout from "ui/Layout/Layout";
import { useMovie } from "domain/movies/hooks/useMovie";
import MovieTrailer from "domain/movies/ui/MovieTrailer/MovieTrailer";
import MovieActors from "domain/movies/ui/MovieActors/MovieActors";
import MovieSkeleton from "domain/movies/ui/MovieSkeleton/MovieSkeleton";
import { useAuthentication } from "domain/authentication/hooks/useAuthentication";
import { toast } from "react-toastify";

const MoviePage = () => {
  const { id } = useParams();
  const { movie, loading, like, dislike } = useMovie(id);
  const { title, description, like_count, dislike_count } = movie || {};
  const { isAuthenticated, toggleLoginForm } = useAuthentication();

  const onAction = (action) => async () => {
    if (!isAuthenticated) {
      toggleLoginForm(true);
      toast("Please first sign in!");
    } else {
      try {
        await action(id);
      } catch (exception) {
        toast("Your request has failed");
      }
    }
  };

  return (
    <Layout>
      <Link to="/">
        <Button
          variant={Variants.SECONDARY}
          leftIcon={BiChevronLeft}
          className="mb-4"
        >
          Back to recommendations
        </Button>
      </Link>

      {loading ? (
        <MovieSkeleton />
      ) : (
        <article>
          <MovieTrailer movie={movie} />
          <div className="flex flex-col md:flex-row justify-between items-center space-x-8">
            <h1 className="text-2xl text-bold py-4">{title}</h1>
            <div className="flex justify-between space-x-4">
              <Button onClick={onAction(like)} leftIcon={BiCaretUp}>
                {like_count} likes
              </Button>
              <Button onClick={onAction(dislike)} leftIcon={BiCaretDown}>
                {dislike_count} dislikes
              </Button>
            </div>
          </div>
          <section className="my-8 grid md:grid-cols-2 grid-cols-1 gap-8">
            <div className="">
              <h2 className="text-2xl mb-4">Overview</h2>
              <p>{description}</p>
            </div>
            <MovieActors movie={movie} />
          </section>
        </article>
      )}
    </Layout>
  );
};

export default MoviePage;
