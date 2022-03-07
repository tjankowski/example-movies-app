import { nanoid } from "nanoid";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import MoviePage from "./MoviePage";

const mockID = nanoid();

const createMockMovie = (id) => ({
  id,
  title: "Movie title",
  description: "Test movie description.",
  like_count: 10,
  dislike_count: 2,
  user_id: nanoid(),
});

const mockUseMovie = jest.fn();

const mockUseParams = jest.fn();

jest.mock("domain/movies/hooks/useMovie", () => {
  return {
    ...jest.requireActual("domain/movies/hooks/useMovie"),
    useMovie: (id) => mockUseMovie(id),
  };
});

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => mockUseParams(),
  };
});

const renderPage = () => {
  return render(
    <BrowserRouter>
      <MoviePage />
    </BrowserRouter>
  );
};

describe("MoviePage", () => {
  beforeEach(() => {
    mockUseMovie.mockClear();
    mockUseParams.mockClear();
    mockUseParams.mockImplementation(() => ({
      id: mockID,
    }));
  });
  it("renders loading state", () => {
    mockUseMovie.mockImplementationOnce(() => ({ movie: null, loading: true }));

    renderPage();
    expect(screen.getByTestId("movie-skeleton")).toBeVisible();
  });

  it("renders loaded movie", () => {
    const mockMovie = createMockMovie();
    mockUseMovie.mockImplementationOnce(() => ({
      movie: mockMovie,
      loading: false,
    }));
    renderPage();
    expect(screen.queryAllByTestId("movie-skeleton").length).toBe(0);
    expect(screen.getByText(mockMovie.title)).toBeVisible();
    expect(screen.getByText(mockMovie.description)).toBeVisible();
    expect(screen.getByText(`${mockMovie.like_count} likes`)).toBeVisible();
    expect(
      screen.getByText(`${mockMovie.dislike_count} dislikes`)
    ).toBeVisible();
  });
});
