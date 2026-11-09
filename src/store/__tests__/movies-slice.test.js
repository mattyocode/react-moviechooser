import moviesReducer, {
  fetchSimilarMovies,
  setMovieOnList,
} from "../movies-slice";

const movie = (slug, onList = false) => ({ slug, title: slug, on_list: onList });

// Thunk lifecycle actions as createAsyncThunk dispatches them.
const pending = (slug) => ({
  type: fetchSimilarMovies.pending.type,
  meta: { arg: slug },
});
const fulfilled = (slug, payload) => ({
  type: fetchSimilarMovies.fulfilled.type,
  meta: { arg: slug },
  payload,
});
const rejected = (slug) => ({
  type: fetchSimilarMovies.rejected.type,
  meta: { arg: slug },
  error: { message: "nope" },
});

const reduce = (...actions) => actions.reduce(moviesReducer, undefined);

describe("similar movies state", () => {
  it("stores the list for the requested movie", () => {
    const state = reduce(pending("a"), fulfilled("a", [movie("b")]));

    expect(state.similarFor).toBe("a");
    expect(state.similarStatus).toBe("succeeded");
    expect(state.similar).toEqual([movie("b")]);
  });

  it("clears the old list while a new movie's list loads", () => {
    const state = reduce(
      pending("a"),
      fulfilled("a", [movie("b")]),
      pending("c")
    );

    expect(state.similar).toEqual([]);
    expect(state.similarStatus).toBe("loading");
  });

  it("ignores a late response for a movie the user has left", () => {
    const state = reduce(pending("a"), pending("c"), fulfilled("a", [movie("x")]));

    expect(state.similarFor).toBe("c");
    expect(state.similar).toEqual([]);
    expect(state.similarStatus).toBe("loading");
  });

  it("ignores a late failure for a movie the user has left", () => {
    const state = reduce(
      pending("a"),
      pending("c"),
      fulfilled("c", [movie("d")]),
      rejected("a")
    );

    expect(state.similarStatus).toBe("succeeded");
    expect(state.similar).toEqual([movie("d")]);
  });

  it("marks a failure for the current movie", () => {
    const state = reduce(pending("a"), rejected("a"));

    expect(state.similarStatus).toBe("failed");
    expect(state.similar).toEqual([]);
  });

  it("updates on_list for a similar movie", () => {
    const state = reduce(
      pending("a"),
      fulfilled("a", [movie("b"), movie("c")]),
      setMovieOnList({ movieSlug: "c", onList: true })
    );

    expect(state.similar).toEqual([movie("b"), movie("c", true)]);
  });
});
