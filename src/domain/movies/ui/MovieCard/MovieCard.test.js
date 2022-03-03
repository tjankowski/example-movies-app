import { nanoid } from "nanoid";
import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";

const movie = {
  id: nanoid(),
  title: "Movie title",
  like_count: 10,
  dislike_count: 2,
  user_id: nanoid(),
};

describe("MovieCard", () => {
  it("renders ratings", () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText(movie.like_count)).toBeVisible();
    expect(screen.getByText(movie.dislike_count)).toBeVisible();
  });
  it("renders title", () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByText(movie.title)).toBeVisible();
    expect(screen.getByText(movie.dislike_count)).toBeVisible();
  });

  it("renders image", () => {
    render(<MovieCard movie={movie} />);
    const imageElement = screen.getByAltText(movie.title);
    expect(imageElement).toBeVisible();
    expect(imageElement.nodeName).toEqual("IMG");
  });
});
