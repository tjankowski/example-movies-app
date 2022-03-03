import { useEffect, useState } from "react";
import { dislike, getMovie, like } from "../api/movies";

export const useMovie = (id) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const item = await getMovie(id);
      setMovie(item);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const onLike = async (id) => {
    await like(id);
    setMovie((movie) => ({ ...movie, like_count: movie.like_count + 1 }));
  };

  const onDislike = async (id) => {
    await dislike(id);
    setMovie((movie) => ({ ...movie, dislike_count: movie.dislike_count + 1 }));
  };

  return {
    movie,
    loading,
    like: onLike,
    dislike: onDislike,
  };
};
