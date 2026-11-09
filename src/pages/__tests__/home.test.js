import React from "react";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
// import * as reactRedux from "react-redux";
import { reduxTestRender } from "../../mocks/test-utils";
import { server, rest } from "../../mocks/server";
import "@testing-library/jest-dom";

import { Home, Movies } from "../../pages";
import textSearchData from "../../mocks/test-data/testTextSearchData.json";
// import store from "../../store/index";

describe("<Home/> page tests", () => {
  const apiUrl = `${import.meta.env.VITE_API}/api/genres/`;
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
      expect(screen.getByText("Pre-1960s")).toBeTruthy();
      expect(screen.getByText("Short")).toBeTruthy();
    });
  });

  it("shows error on 404 response to GET request", async () => {
    cleanup();
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Not found" }));
      })
    );

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

    expect(screen.getByText(/1000s of acclaimed movies./i)).toBeInTheDocument();

    let submitBtn = await screen.findByTestId(
      "all-matches-btn",
      {},
      { timeout: 3000 }
    );

    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Movie results page/i)).toBeInTheDocument();
  });

  it("a text search reaches the results page with labelled posters", async () => {
    cleanup();
    window.scrollTo = vi.fn();
    const requests = [];
    server.use(
      rest.get(`${import.meta.env.VITE_API}/api/movies/`, (req, res, ctx) => {
        requests.push(req.url.searchParams);
        return res(ctx.json(textSearchData));
      }),
      // The default count mock says 0 for any genre, which blocks submit.
      rest.get(`${import.meta.env.VITE_API}/api/movies/count/`, (req, res, ctx) =>
        res(ctx.json({ count: 40 }))
      )
    );

    reduxTestRender(
      <MemoryRouter initialEntries={["/"]}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </MemoryRouter>,
      { preloadedState: { options: initialOptionsState } }
    );

    const box = await screen.findByRole(
      "searchbox",
      { name: "Describe what you're in the mood for" },
      { timeout: 3000 }
    );
    fireEvent.click(screen.getByText("Horror"));
    fireEvent.change(box, { target: { value: "i'm hungry" } });
    // Wait for the live count, so submit isn't racing it.
    await screen.findByText("Show top 30");
    fireEvent.click(screen.getByTestId("all-matches-btn"));

    expect(await screen.findByTestId("Parasite-card")).toBeInTheDocument();
    expect(screen.getAllByTestId("match-label")).toHaveLength(3);
    expect(screen.getByTestId("results-count")).toHaveTextContent(
      'for "i\'m hungry"'
    );

    expect(requests).toHaveLength(1);
    expect(requests[0].get("q")).toBe("i'm hungry");
    expect(requests[0].get("g")).toBe("11");
    expect(requests[0].get("dmin")).toBe("pre");
    expect(requests[0].get("rmax")).toBe(">150");
  });
});
