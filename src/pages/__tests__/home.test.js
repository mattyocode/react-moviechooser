import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
// import * as reactRedux from "react-redux";
import { reduxTestRender } from "../../mocks/test-utils";
import { server, rest } from "../../mocks/server";
import "@testing-library/jest-dom";

import { Home } from "../../pages";
// import store from "../../store/index";

describe("<Home/> page tests", () => {
  const apiUrl = `${process.env.REACT_APP_API}/api/genres/`;
  console.log(">>>>>>", apiUrl);
  const initialOptionsState = {
    options: {},
    status: "idle",
    error: null,
  };
  beforeEach(() => {
    reduxTestRender(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      { preloadedState: { options: initialOptionsState } }
    );
  });
  it("renders <Home/>", async () => {
    await waitFor(() => {
      expect(screen.getByText("Sci-Fi")).toBeTruthy();
      expect(screen.getByText("Horror")).toBeTruthy();
      expect(screen.getByText("Adventure")).toBeTruthy();
      expect(screen.getByText("1970s")).toBeTruthy();
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
    console.log(">>>>", apiUrl);

    reduxTestRender(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      { preloadedState: { options: initialOptionsState } }
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

    reduxTestRender(
      <MemoryRouter initialEntries={["/"]}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies">
          <p>Movie results page.</p>
        </Route>
      </MemoryRouter>,
      { preloadedState: { options: initialOptionsState } }
    );

    expect(
      screen.getByText(/Choose from 1000s of acclaimed movies./i)
    ).toBeInTheDocument();

    let submitBtn = await screen.findByTestId(
      "all-matches-btn",
      {},
      { timeout: 3000 }
    );

    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Movie results page/i)).toBeInTheDocument();
  });
});
