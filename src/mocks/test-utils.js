import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import authReducer from "../store/auth-slice";
import moviesReducer from "../store/movies-slice";
import optionsReducer from "../store/query-slice";
import listReducer from "../store/list-slice";

function reduxTestRender(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        movies: moviesReducer,
        options: optionsReducer,
        list: listReducer,
        auth: authReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { reduxTestRender };
