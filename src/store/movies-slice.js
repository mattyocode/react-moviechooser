import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/axios-refresh";
import queryString from "../utils/query-string";

const initialMoviesState = {
  queryParams: undefined,
  movies: [],
  status: "idle",
  error: null,
  totalCount: 0,
  nextPageUrl: null,
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
      state.status = "updating";
    },
    [fetchSingleMovie.fulfilled]: (state, action) => {
      state.movies = [action.payload];
      state.status = "succeeded";
    },
    [fetchSingleMovie.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { setMovieQuery, setMovieOnList } = moviesSlice.actions;
export default moviesSlice.reducer;
