import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { server, rest } from "../../test/server";
import "@testing-library/jest-dom";

import { reduxTestRender } from "../../test/test-utils";
import storeMovies from "../../fixtures/updatedMoviesData.json";
import { Movies } from "../../pages";

describe("<Movies/> page tests", () => {
  const apiUrl = `${process.env.REACT_APP_TEST_API}/movies`;
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
  it("renders Movie page with queryParams and movies in Redux state", async () => {
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

  it("calls server for movies if queryParams but no movies in state", async () => {
    cleanup();
    const initialState = {
      queryParams: testQueryParams,
      movies: [],
      status: "succeeded",
      error: null,
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });
    screen.debug();
    expect(screen.getByTestId("movies")).toBeTruthy();
    expect(await screen.findByText(/jurassic park/i)).toBeTruthy();
  });

  it("shows error on 404 response to GET request", async () => {
    cleanup();
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Not found" }));
      })
    );
    const initialState = {
      queryParams: testQueryParams,
      movies: [],
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });
    expect(screen.getByTestId("movies")).toBeTruthy();
    expect(await screen.findByText(/error/i)).toBeTruthy();
  });

  it("shows loading spinner before card data loads", () => {
    const initialState = {
      queryParams: testQueryParams,
      movies: [],
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("redirects to homepage with no queryParams in Redux state", async () => {
    const initialState = {
      queryParams: undefined,
      movies: storeMovies,
      status: "idle",
      error: null,
    };

    reduxTestRender(
      <MemoryRouter initialEntries={["/movies"]}>
        <Route path="/" exact>
          <p>Homepage</p>
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </MemoryRouter>,
      { preloadedState: { movies: initialState } }
    );
    expect(await screen.findByText(/homepage/i)).toBeTruthy();
  });
});
