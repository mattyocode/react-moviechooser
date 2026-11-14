import React from "react";
import {
  cleanup,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route } from "react-router-dom";
import { server, rest } from "../../mocks/server";
import "@testing-library/jest-dom";
import { reduxTestRender } from "../../mocks/test-utils";
import { MovieDetail } from "../../pages";
import testMoviesData from "../../mocks/test-data/testMoviesData.json";
import testSimilarData from "../../mocks/test-data/testSimilarData.json";

const apiUrlRoot = import.meta.env.VITE_API;

// jsdom doesn't implement scrolling; the page resets scroll on mount.
window.scrollTo = vi.fn();

const unauthorizedInitialAuthState = {
  token: null,
  refreshToken: null,
  account: null,
  status: "idle",
  error: null,
};

describe("<MovieDetail/> Surprise page tests", () => {
  const apiUrl = `${apiUrlRoot}/api/movies/random`;

  beforeEach(() => {
    reduxTestRender(
      <MemoryRouter initialEntries={["/movies/surprise"]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>,
      { preloadedState: { auth: { auth: unauthorizedInitialAuthState } } }
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
  });

  it("offers a labelled where-to-watch button and a poster backdrop", async () => {
    expect(await screen.findByTestId("watch-cta")).toHaveTextContent(
      /where to watch/i
    );
    expect(screen.getByTestId("backdrop")).toBeInTheDocument();
  });

  it("offers to spin again once a movie is shown", async () => {
    expect(await screen.findByTestId("spin-again-btn")).toHaveTextContent(
      /spin again/i
    );
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
      </MemoryRouter>,
      { preloadedState: { auth: { auth: unauthorizedInitialAuthState } } }
    );
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

describe("<MovieDetail/> Movie ID page tests", () => {
  const apiUrl = `${import.meta.env.VITE_API}/api/movies/123`;
  beforeEach(() => {
    reduxTestRender(
      <MemoryRouter initialEntries={["/movies/123"]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>,
      { preloadedState: { auth: { auth: unauthorizedInitialAuthState } } }
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
    });
  });

  it("shows error on error", async () => {
    cleanup();
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Not found" }));
      })
    );
    reduxTestRender(
      <MemoryRouter initialEntries={["/movies/123"]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>,
      { preloadedState: { auth: { auth: unauthorizedInitialAuthState } } }
    );
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});

describe("<MovieDetail/> more like this", () => {
  const similarUrl = `${apiUrlRoot}/api/movies/:slug/similar/`;
  const authorizedInitialAuthState = {
    token: "testtoken",
    refreshToken: "test-refresh-token",
    account: { name: "test-user", email: "test@email.com" },
    status: "idle",
    error: null,
  };
  const movie = (slug, title) => ({
    ...testMoviesData[1],
    slug,
    title,
    on_list: false,
  });

  const renderPage = (path, auth = unauthorizedInitialAuthState) =>
    reduxTestRender(
      <MemoryRouter initialEntries={[path]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>,
      { preloadedState: { auth: { auth } } }
    );

  const row = () => screen.findByTestId("similar-movies");
  const rowTitles = (section) =>
    within(section)
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

  it("shows similar movies in API order under the movie", async () => {
    renderPage("/movies/123");

    const section = await row();
    expect(
      within(section).getByRole("heading", { name: "More like this" })
    ).toBeInTheDocument();
    expect(rowTitles(section)).toEqual(testSimilarData.map((m) => m.title));
    expect(within(section).queryAllByTestId("match-label")).toHaveLength(0);
  });

  it("shows a row on the random page", async () => {
    renderPage("/movies/surprise");

    expect(rowTitles(await row())).toEqual(
      testSimilarData.map((m) => m.title)
    );
  });

  it("replaces the row when spinning again", async () => {
    const randoms = [testMoviesData[0], testMoviesData[2]];
    let spins = 0;
    server.use(
      rest.get(`${apiUrlRoot}/api/movies/random`, (req, res, ctx) =>
        res(ctx.json(randoms[Math.min(spins++, 1)]))
      ),
      rest.get(similarUrl, (req, res, ctx) =>
        res(
          ctx.json(
            req.params.slug === testMoviesData[0].slug
              ? [movie("first-similar", "First Similar")]
              : [movie("second-similar", "Second Similar")]
          )
        )
      )
    );
    renderPage("/movies/surprise");

    expect(rowTitles(await row())).toEqual(["First Similar"]);
    userEvent.click(screen.getByTestId("spin-again-btn"));

    await waitFor(() =>
      expect(rowTitles(screen.getByTestId("similar-movies"))).toEqual([
        "Second Similar",
      ])
    );
  });

  it("hides the row when there are no similar movies", async () => {
    server.use(rest.get(similarUrl, (req, res, ctx) => res(ctx.json([]))));
    renderPage("/movies/123");

    expect(await screen.findByText(/finding nemo/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("similar-loading")).toBeNull()
    );
    expect(screen.queryByTestId("similar-movies")).toBeNull();
    expect(screen.queryByText("More like this")).toBeNull();
  });

  it("hides the row, with no error, when the request fails", async () => {
    server.use(
      rest.get(similarUrl, (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ detail: "Server error" }))
      )
    );
    renderPage("/movies/123");

    expect(await screen.findByText(/finding nemo/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("similar-loading")).toBeNull()
    );
    expect(screen.queryByTestId("similar-movies")).toBeNull();
    expect(screen.queryByText(/error/i)).toBeNull();
  });

  it("shows a loader while the row loads", async () => {
    server.use(
      rest.get(similarUrl, (req, res, ctx) =>
        res(ctx.delay(200), ctx.json(testSimilarData))
      )
    );
    renderPage("/movies/123");

    expect(await screen.findByTestId("similar-loading")).toBeInTheDocument();
    expect(await row()).toBeInTheDocument();
    expect(screen.queryByTestId("similar-loading")).toBeNull();
  });

  it("opening a similar movie shows it and its own row", async () => {
    const next = movie("next-movie", "Next Movie");
    server.use(
      rest.get(`${apiUrlRoot}/api/movies/next-movie`, (req, res, ctx) =>
        res(ctx.json(next))
      ),
      rest.get(similarUrl, (req, res, ctx) =>
        res(
          ctx.json(
            req.params.slug === "next-movie"
              ? [movie("after-next", "After Next")]
              : [next]
          )
        )
      )
    );
    renderPage("/movies/123");

    const section = await row();
    userEvent.click(
      within(section).getByRole("link", { name: /next movie – details/i })
    );

    expect(
      await screen.findByTestId("movie-detail-next-movie")
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(rowTitles(screen.getByTestId("similar-movies"))).toEqual([
        "After Next",
      ])
    );
  });

  it("updates a similar movie's bookmark when it's added to the list", async () => {
    renderPage("/movies/123", authorizedInitialAuthState);

    const section = await row();
    const title = testSimilarData[0].title;
    userEvent.click(within(section).getByTestId(`${title}-add`));

    expect(
      await within(section).findByTestId(`${title}-remove`)
    ).toBeInTheDocument();
  });
});
