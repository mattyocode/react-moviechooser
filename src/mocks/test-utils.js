import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

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
  // Tests that need specific routes or entries pass their own MemoryRouter.
  // React Router 6+ doesn't allow one router inside another, so only add one
  // when the test didn't.
  const hasOwnRouter = React.isValidElement(ui) && ui.type === MemoryRouter;
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        {hasOwnRouter ? children : <MemoryRouter>{children}</MemoryRouter>}
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export { reduxTestRender };
