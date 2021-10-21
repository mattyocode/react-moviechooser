import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/api-client";

// import keysToCamel from "../utils/camelcase";
import queryString from "../utils/query-string";

const initialMoviesState = {
  queryParams: undefined,
  movies: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (queryObj) => {
    // refactor to encode query params
    console.log("query params in moviesSlice", queryObj);

    const queryParamsStr = queryString(queryObj);
    console.log(queryParamsStr);

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
