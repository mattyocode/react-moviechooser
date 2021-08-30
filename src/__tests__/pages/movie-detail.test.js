import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { server, rest } from "../../test/server";
import "@testing-library/jest-dom";

import { MovieDetail } from "../../pages";

describe("<MovieDetail/> Surprise page tests", () => {
  const apiUrl = `${process.env.REACT_APP_TEST_API}/random`;
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/movie/surprise"]}>
        <Route path="/movie/:movieId">
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
    await waitFor(() => {
      expect(screen.getByText(/parasite/i)).toBeInTheDocument();
      expect(screen.getByTestId("card")).toBeInTheDocument();
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
      <MemoryRouter initialEntries={["/movie/surprise"]}>
        <Route path="/movie/:movieId">
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
  const apiUrl = `${process.env.REACT_APP_TEST_API}/random`;
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/movie/123"]}>
        <Route path="/movie/:movieId">
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
      expect(screen.getByText(/finding nemo/i)).toBeInTheDocument();
      expect(screen.getByTestId("card")).toBeInTheDocument();
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
      <MemoryRouter initialEntries={["/movie/surprise"]}>
        <Route path="/movie/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
