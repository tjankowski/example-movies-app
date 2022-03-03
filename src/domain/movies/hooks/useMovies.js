import { useEffect, useState } from "react";
import { getMovies } from "../api/movies";

export const useMovies = (page) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getMovies(page);
      setMovies(items);
      setLoading(false);
    };
    fetchData();
  }, [page]);

  return {
    movies,
    loading,
  };
};
