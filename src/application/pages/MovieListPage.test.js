import { nanoid } from "nanoid";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockItems } from "utils/utils";
import MovieListPage from "./MovieListPage";

const createMockMovie = (title = "Movie title") => ({
  id: nanoid(),
  title: title,
  like_count: 10,
  dislike_count: 2,
  user_id: nanoid(),
});

const mockUseMovies = jest.fn();

const mockSearchParams = {
  get: jest.fn(),
};
const mockSetSearchParams = jest.fn();

jest.mock("domain/movies/hooks/useMovies", () => {
  return {
    ...jest.requireActual("domain/movies/hooks/useMovies"),
    useMovies: (page) => mockUseMovies(page),
  };
});

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useSearchParams: () => [mockSearchParams, mockSetSearchParams],
  };
});

describe("MovieListPage", () => {
  beforeEach(() => {
    mockUseMovies.mockClear();
    mockSearchParams.get.mockClear();
    mockSetSearchParams.mockClear();
  });
  it("renders loading state", () => {
    mockUseMovies.mockImplementationOnce(() => ({ movies: [], loading: true }));
    render(<MovieListPage />);
    expect(screen.getAllByTestId("movie-card-skeleton").length).toBe(5);
    expect(screen.queryByText("Previous page")).toBeNull();
    expect(screen.queryByText("Next page")).toBeNull();
  });

  it("renders loaded movies", () => {
    const mockMovie = createMockMovie();
    mockUseMovies.mockImplementationOnce(() => ({
      movies: [mockMovie],
      loading: false,
    }));
    render(
      <BrowserRouter>
        <MovieListPage />
      </BrowserRouter>
    );
    expect(screen.queryAllByTestId("movie-card-skeleton").length).toBe(0);
    expect(screen.getByText(mockMovie.title)).toBeVisible();
    expect(screen.queryByText("Previous page")).toBeNull();
    expect(screen.queryByText("Next page")).toBeNull();
  });

  it("renders link to next page", () => {
    const movieTitle = "Test movie title";
    mockUseMovies.mockImplementationOnce(() => ({
      movies: mockItems(5).map(() => createMockMovie(movieTitle)),
      loading: false,
    }));
    render(
      <BrowserRouter>
        <MovieListPage />
      </BrowserRouter>
    );
    expect(screen.queryAllByTestId("movie-card-skeleton").length).toBe(0);
    expect(screen.queryAllByText(movieTitle).length).toBe(5);
    expect(screen.queryByText("Previous page")).toBeNull();
    expect(screen.getByText("Next page")).toBeVisible();
  });

  it("renders link to previous page", () => {
    const movieTitle = "Test movie title";
    mockUseMovies.mockImplementationOnce(() => ({
      movies: mockItems(4).map(() => createMockMovie(movieTitle)),
      loading: false,
    }));
    mockSearchParams.get.mockImplementationOnce(() => 2);
    render(
      <BrowserRouter>
        <MovieListPage />
      </BrowserRouter>
    );
    expect(screen.queryAllByTestId("movie-card-skeleton").length).toBe(0);
    expect(screen.queryAllByText(movieTitle).length).toBe(4);
    expect(screen.getByText("Previous page")).toBeVisible();
    expect(screen.queryByText("Next page")).toBeNull();
  });

  it("changes to next page", () => {
    mockUseMovies.mockImplementationOnce(() => ({
      movies: mockItems(5).map(() => createMockMovie()),
      loading: false,
    }));
    render(
      <BrowserRouter>
        <MovieListPage />
      </BrowserRouter>
    );
    const nextPage = screen.getByText("Next page");
    fireEvent.click(nextPage);
    expect(mockSetSearchParams).toBeCalledTimes(1);
    expect(mockSetSearchParams).toBeCalledWith({ page: 1 });
  });

  it("changes to prev page", () => {
    mockUseMovies.mockImplementationOnce(() => ({
      movies: mockItems(5).map(() => createMockMovie()),
      loading: false,
    }));
    mockSearchParams.get.mockImplementationOnce(() => 3);
    render(
      <BrowserRouter>
        <MovieListPage />
      </BrowserRouter>
    );
    const prevPage = screen.getByText("Previous page");
    fireEvent.click(prevPage);
    expect(mockSetSearchParams).toBeCalledTimes(1);
    expect(mockSetSearchParams).toBeCalledWith({ page: 2 });
  });
});
