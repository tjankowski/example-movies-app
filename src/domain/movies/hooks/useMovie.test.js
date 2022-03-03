import { nanoid } from "nanoid";
import { renderHook, act } from "@testing-library/react-hooks";
import { useMovie } from "./useMovie";

const ID = nanoid();

const mockMovie = {
  id: ID,
  title: "Movie title",
  like_count: 10,
  dislike_count: 2,
  user_id: nanoid(),
};

const mockGetMovie = jest.fn();
const mockLike = jest.fn();
const mockDislike = jest.fn();

jest.mock("domain/movies/api/movies", () => {
  return {
    ...jest.requireActual("domain/movies/api/movies"),
    getMovie: (id) => mockGetMovie(id),
    like: (id) => mockLike(id),
    dislike: (id) => mockDislike(id),
  };
});

describe("useMovie", () => {
  beforeEach(() => {
    mockGetMovie.mockClear();
    mockLike.mockClear();
    mockDislike.mockClear();
    mockGetMovie.mockImplementation(() => mockMovie);
  });
  it("should fetch movie", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMovie(ID));

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.movie).toBe(mockMovie);
    expect(result.current.loading).toBe(false);
    expect(mockGetMovie).toBeCalledWith(ID);
    expect(mockGetMovie).toBeCalledTimes(1);
  });

  it("should like movie", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMovie(ID));

    await waitForNextUpdate();
    expect(result.current.movie).toBe(mockMovie);

    act(() => {
      result.current.like(ID);
    });
    await waitForNextUpdate();
    expect(mockLike).toBeCalledWith(ID);
    expect(mockLike).toBeCalledTimes(1);
    expect(result.current.movie.like_count).toBe(mockMovie.like_count + 1);
  });

  it("should dislike movie", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMovie(ID));

    await waitForNextUpdate();
    expect(result.current.movie).toBe(mockMovie);

    act(() => {
      result.current.dislike(ID);
    });
    await waitForNextUpdate();
    expect(mockDislike).toBeCalledWith(ID);
    expect(mockDislike).toBeCalledTimes(1);
    expect(result.current.movie.dislike_count).toBe(
      mockMovie.dislike_count + 1
    );
  });
});
