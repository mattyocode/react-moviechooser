import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import * as reactRedux from "react-redux";
import { server, rest } from "../../test/server";
import "@testing-library/jest-dom";

import { Home } from "../../pages";
import store from "../../store/index";

describe("<Home/> page tests", () => {
  const apiUrl = `${process.env.REACT_APP_TEST_API}/genres/`;

  beforeEach(() => {
    render(
      <reactRedux.Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </reactRedux.Provider>
    );
  });
  it("renders <Home/>", async () => {
    await waitFor(() => {
      expect(screen.getByText("Sci-Fi")).toBeTruthy();
      expect(screen.getByText("Horror")).toBeTruthy();
      expect(screen.getByText("Adventure")).toBeTruthy();
      expect(screen.getByText("70s")).toBeTruthy();
      expect(screen.getByText("75m")).toBeTruthy();
    });
  });

  it("shows error on 404 response to GET request", async () => {
    cleanup();
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Not found" }));
      })
    );

    render(
      <reactRedux.Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </reactRedux.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeTruthy();
    });
  });

  it("shows loading spinner before form data loads", () => {
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("submit handler redirects to movies page after calling fetchMovies", async () => {
    cleanup();
    render(
      <reactRedux.Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movies">
            <p>Movie results page.</p>
          </Route>
        </MemoryRouter>
      </reactRedux.Provider>
    );

    expect(screen.getByText(/start watching/i)).toBeInTheDocument();
    expect(screen.getByText(/runtime/i)).toBeInTheDocument();

    let submitBtn = await screen.findByTestId(
      "all-matches-btn",
      {},
      { timeout: 3000 }
    );

    fireEvent.click(submitBtn);

    expect(screen.getByText(/Movie results page/i)).toBeInTheDocument();
  });
});
