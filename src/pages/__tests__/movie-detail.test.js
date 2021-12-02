import React from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { server, rest } from "../../mocks/server";
import "@testing-library/jest-dom";
import { reduxTestRender } from "../../mocks/test-utils";
import { MovieDetail } from "../../pages";

const apiUrlRoot = process.env.REACT_APP_TEST_API;
console.log("movie-detail apiUrlRoot >", apiUrlRoot);

describe("<MovieDetail/> Surprise page tests", () => {
  const apiUrl = `${apiUrlRoot}/api/movies/random`;
  beforeEach(() => {
    reduxTestRender(
      <MemoryRouter initialEntries={["/movies/surprise"]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>
    );
  });

  it("renders <MovieDetail/> page with movie", async () => {
    expect(await screen.findByTestId("surprise")).toBeInTheDocument();
  });

  it("shows loading spinner initally", () => {
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows movie card once loaded", async () => {
    await waitForElementToBeRemoved(() =>
      screen.getByTestId("loading-spinner")
    );
    expect(await screen.findByText(/parasite/i)).toBeInTheDocument();
    expect(await screen.findByTestId("card")).toBeInTheDocument();
  });

  it("shows error on error", async () => {
    cleanup();
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Not found" }));
      })
    );
    reduxTestRender(
      <MemoryRouter initialEntries={["/movies/surprise"]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

describe("<MovieDetail/> Movie ID page tests", () => {
  const apiUrl = `${process.env.REACT_APP_TEST_API}/api/movies/123`;
  console.log("movie detail >> ", apiUrl);
  beforeEach(() => {
    reduxTestRender(
      <MemoryRouter initialEntries={["/movies/123"]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>
    );
  });

  it("renders <MovieDetail/> page with movie", async () => {
    expect(await screen.findByTestId("movie-detail-123")).toBeInTheDocument();
  });

  it("shows loading spinner initally", () => {
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows movie card once loaded", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByText(/finding nemo/i)).toBeInTheDocument();
    });
  });

  it("shows error on error", async () => {
    cleanup();
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Not found" }));
      })
    );
    render(
      <MemoryRouter initialEntries={["/movies/123"]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
