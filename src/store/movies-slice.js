import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/api-client";

// import keysToCamel from "../utils/camelcase";
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
    // refactor to encode query params
    const queryParamsStr = queryString(queryObj);
    const response = await client.get(`movies/?${queryParamsStr}`);
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
  },
});

export const { setMovieQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
