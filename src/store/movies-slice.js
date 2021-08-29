import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/api-client";

import keysToCamel from "../utils/camelcase";

const initialMoviesState = {
  queryParams: undefined,
  movies: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (queryParams) => {
    // refactor to encode query params
    // console.log("query params in moviesSlice", queryParams);
    const response = await client.get("movies");
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
      state.status = "succeeded";
      let camelcaseKeys = [];
      let moviesData = action.payload;
      moviesData.forEach((movie) => {
        camelcaseKeys.push(keysToCamel(movie));
      });
      state.movies = camelcaseKeys;
    },
    [fetchMovies.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { setMovieQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
