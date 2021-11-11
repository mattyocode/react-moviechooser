import { configureStore } from "@reduxjs/toolkit";

import optionsReducer from "./query-slice";
import uiReducer from "./ui-slice";
import moviesReducer from "./movies-slice";

const store = configureStore({
  reducer: {
    options: optionsReducer,
    ui: uiReducer,
    movies: moviesReducer,
  },
});

export default store;
