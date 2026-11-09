import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils/axios-refresh";
import queryString from "../utils/query-string";

const initialMoviesState = {
  queryParams: undefined,
  movies: [],
  status: "idle",
  error: null,
  totalCount: 0,
  nextPageUrl: null,
  // The single movie on the detail/surprise page, kept apart from the
  // results list so opening a movie doesn't wipe the user's results.
  current: null,
  currentStatus: "idle",
  currentError: null,
  // "More like this" for the current movie; similarFor is the slug asked for,
  // so a late response for a movie the user has left can be dropped.
  similar: [],
  similarStatus: "idle",
  similarFor: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (queryObj) => {
    const queryParamsStr = queryString(queryObj);
    const response = await client.get(`api/movies/?${queryParamsStr}`);
    return response;
  }
);

export const addMovies = createAsyncThunk(
  "movies/addMovies",
  async (nextPageUrl) => {
    const response = await client.get(`${nextPageUrl}`, {});
    return response;
  }
);

export const fetchSingleMovie = createAsyncThunk(
  "movies/fetchSingleMovie",
  async (movieId) => {
    const response = await client.get(`api/movies/${movieId}`);
    return response;
  }
);

export const fetchSimilarMovies = createAsyncThunk(
  "movies/fetchSimilarMovies",
  async (slug) => {
    const response = await client.get(`api/movies/${slug}/similar/`);
    return response;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    setMovieQuery(state, action) {
      state.queryParams = action.payload;
    },
    setMovieOnList(state, action) {
      const { movieSlug, onList } = action.payload;
      const existingMovie = state.movies.find(
        (movie) => movie.slug === movieSlug
      );
      if (existingMovie) {
        existingMovie.on_list = onList;
      }
      if (state.current && state.current.slug === movieSlug) {
        state.current.on_list = onList;
      }
      // Tests can preload a movies state without similar.
      (state.similar || []).forEach((movie) => {
        if (movie.slug === movieSlug) movie.on_list = onList;
      });
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchMovies.fulfilled]: (state, action) => {
      state.movies = action.payload.results;
      state.totalCount = action.payload.count;
      state.nextPageUrl = action.payload.next;
      state.status = "succeeded";
    },
    [fetchMovies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      // Don't leave the previous search's posters under the new query.
      state.movies = [];
      state.totalCount = 0;
      state.nextPageUrl = null;
    },
    [addMovies.pending]: (state, action) => {
      state.status = "updating";
    },
    [addMovies.fulfilled]: (state, action) => {
      state.movies = state.movies.concat(action.payload.results);
      state.nextPageUrl = action.payload.next;
      state.status = "succeeded";
    },
    [addMovies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchSingleMovie.pending]: (state, action) => {
      state.currentStatus = "updating";
    },
    [fetchSingleMovie.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.currentStatus = "succeeded";
    },
    [fetchSingleMovie.rejected]: (state, action) => {
      state.currentStatus = "failed";
      state.currentError = action.error.message;
    },
    [fetchSimilarMovies.pending]: (state, action) => {
      state.similarFor = action.meta.arg;
      state.similar = [];
      state.similarStatus = "loading";
    },
    [fetchSimilarMovies.fulfilled]: (state, action) => {
      if (action.meta.arg !== state.similarFor) return;
      state.similar = action.payload;
      state.similarStatus = "succeeded";
    },
    [fetchSimilarMovies.rejected]: (state, action) => {
      if (action.meta.arg !== state.similarFor) return;
      state.similar = [];
      state.similarStatus = "failed";
    },
  },
});

export const { setMovieQuery, setMovieOnList } = moviesSlice.actions;
export default moviesSlice.reducer;
