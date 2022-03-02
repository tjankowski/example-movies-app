/**
 * DOCS https://peanut-movies.herokuapp.com/api-docs/index.html
 */

import { request } from "infrastrucutre/api";

export const getMovies = async (page = 0) => {
  const responseBody = await request(`/movies?page=${page}`);
  return responseBody.movies;
};

export const getMovie = async (id) => {
  const responseBody = await request(`/movies/${id}`);
  return responseBody.movie;
};

export const addMovie = (title, description) => {
  const responseBody = request(`/movies`, {
    method: "POST",
    body: JSON.stringify({ movie: { title, description } }),
  });
  return responseBody.movie;
};

export const updateMovie = (id, title, description) => {
  const responseBody = request(`/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify({ movie: { title, description } }),
  });
  return responseBody.movie;
};

export const deleteMovie = async (id) => {
  const responseBody = await request(`/movies/${id}`, {
    method: "DELETE",
  });
  return responseBody;
};

export const like = async (id) => {
  const responseBody = await request(`/movies/${id}/like`, {
    method: "POST",
  });
  //TODO should we remove dislike here?
  return responseBody;
};

export const dislike = async (id) => {
  const responseBody = await request(`/movies/${id}/dislike`, {
    method: "POST",
  });
  //TODO should we remove like here?
  return responseBody;
};
