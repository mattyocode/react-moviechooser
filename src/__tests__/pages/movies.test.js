import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import * as reactRedux from "react-redux";
import { server, rest } from "../../test/server";
import "@testing-library/jest-dom";

import { reduxTestRender } from "../../test/test-utils";
import storeMovies from "../../fixtures/moviesDataFromStore.json";
import { Movies } from "../../pages";

describe("<Movies/> page tests", () => {
  const testQueryParams = {
    genre: [],
    decade: {
      min: "70s",
      max: "20s",
    },
    runtime: {
      min: "75m",
      max: "2h",
    },
  };
  it("renders Movie page with query and movies in Redux state", async () => {
    const initialState = {
      queryParams: testQueryParams,
      movies: storeMovies,
      status: "succeeded",
      error: null,
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });
    expect(screen.getByTestId("movies")).toBeTruthy();
    expect(await screen.findByText(/Jurassic Park/i)).toBeTruthy();
  });
});
