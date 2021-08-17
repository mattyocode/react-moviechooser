import { createSlice } from "@reduxjs/toolkit";

const initialMoviesState = {
  queryParams: {},
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initialMoviesState,
  reducers: {
    getMovies(state, action) {
      state.queryParams = action.payload.queryParams;
      state.movies = action.payload.movies;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;
