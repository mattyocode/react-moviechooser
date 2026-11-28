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
import { server, http, HttpResponse } from "../../mocks/server";
import { delay } from "msw";
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

  it("shows a poster backdrop, with where to watch on the card's TV icon only", async () => {
    expect(await screen.findByTestId("backdrop")).toBeInTheDocument();
    expect(
      await screen.findByTestId(`${testMoviesData[0].title}-ondemand`)
    ).toHaveAttribute("aria-label", "Where to watch");
    // The old button had visible text; the icons only have an aria-label.
    expect(screen.queryByText(/^where to watch$/i)).toBeNull();
    expect(screen.queryByTestId("watch-cta")).toBeNull();
    expect(screen.queryByTestId("not-streaming-note")).toBeNull();
  });

  it("says when a movie isn't streaming, since there's no TV icon", async () => {
    cleanup();
    server.use(
      http.get(`${apiUrl}`, () =>
        HttpResponse.json({ ...testMoviesData[0], ondemand: [] })
      )
    );
    reduxTestRender(
      <MemoryRouter initialEntries={["/movies/surprise"]}>
        <Route path="/movies/:movieId">
          <MovieDetail />
        </Route>
      </MemoryRouter>,
      { preloadedState: { auth: { auth: unauthorizedInitialAuthState } } }
    );

    expect(await screen.findByTestId("not-streaming-note")).toHaveTextContent(
      "Not streaming in the UK right now"
    );
    expect(
      screen.queryByTestId(`${testMoviesData[0].title}-ondemand`)
    ).toBeNull();
  });

  it("offers to spin again once a movie is shown", async () => {
    expect(await screen.findByTestId("spin-again-btn")).toHaveTextContent(
      /spin again/i
    );
  });

  it("shows error on error", async () => {
    cleanup();
    server.use(
      http.get(`${apiUrl}`, () => {
        return HttpResponse.json({ error: "Not found" }, { status: 404 });
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
      http.get(`${apiUrl}`, () => {
        return HttpResponse.json({ error: "Not found" }, { status: 404 });
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
      http.get(`${apiUrlRoot}/api/movies/random`, () =>
        HttpResponse.json(randoms[Math.min(spins++, 1)])
      ),
      http.get(similarUrl, ({ params }) =>
        HttpResponse.json(
          params.slug === testMoviesData[0].slug
            ? [movie("first-similar", "First Similar")]
            : [movie("second-similar", "Second Similar")]
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
    server.use(http.get(similarUrl, () => HttpResponse.json([])));
    renderPage("/movies/123");

    expect(await screen.findByText(/finding nemo/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("similar-loading")).toBeNull()
    );
    expect(screen.queryByTestId("similar-movies")).toBeNull();
    expect(screen.queryByText("More like this")).toBeNull();
  });

  it("hides the row and logs it when the request fails", async () => {
    const logError = vi.spyOn(console, "error").mockImplementation(() => {});
    server.use(
      http.get(similarUrl, () =>
        HttpResponse.json({ detail: "Server error" }, { status: 500 })
      )
    );
    renderPage("/movies/123");

    expect(await screen.findByText(/finding nemo/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("similar-loading")).toBeNull()
    );
    expect(screen.queryByTestId("similar-movies")).toBeNull();
    expect(screen.queryByText(/error/i)).toBeNull();
    expect(logError).toHaveBeenCalledWith(
      `Couldn't load similar movies for ${testMoviesData[3].slug}:`,
      "Server error"
    );
    logError.mockRestore();
  });

  it("shows skeleton posters while the row loads, then the real cards", async () => {
    server.use(
      http.get(similarUrl, async () => {
        await delay(200);
        return HttpResponse.json(testSimilarData);
      })
    );
    renderPage("/movies/123");

    const loading = await screen.findByTestId("similar-loading");
    expect(loading).toHaveAttribute("aria-busy", "true");
    expect(
      within(loading).getByRole("heading", { name: "More like this" })
    ).toBeInTheDocument();
    const skeletons = within(loading).getAllByTestId("poster-skeleton");
    expect(skeletons).toHaveLength(6);
    skeletons.forEach((skeleton) =>
      expect(skeleton).toHaveAttribute("aria-hidden", "true")
    );

    expect(rowTitles(await row())).toEqual(
      testSimilarData.map((m) => m.title)
    );
    expect(screen.queryByTestId("similar-loading")).toBeNull();
    expect(screen.queryAllByTestId("poster-skeleton")).toHaveLength(0);
  });

  it("opening a similar movie shows it and its own row", async () => {
    const next = movie("next-movie", "Next Movie");
    server.use(
      http.get(`${apiUrlRoot}/api/movies/next-movie`, () =>
        HttpResponse.json(next)
      ),
      http.get(similarUrl, ({ params }) =>
        HttpResponse.json(
          params.slug === "next-movie"
            ? [movie("after-next", "After Next")]
            : [next]
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

  it("credits the movie and its similar movies' articles under the row", async () => {
    renderPage("/movies/123");

    const attribution = within(await row()).getByTestId("plot-attribution");
    const current = testMoviesData[3];
    const expected = [current, ...testSimilarData].filter(
      (m) => m.plot_source_url
    );
    const hrefs = within(attribution)
      .getAllByRole("link", { hidden: true })
      .map((link) => link.getAttribute("href"))
      .filter((href) => href.includes("wikipedia"));
    expect(hrefs).toEqual([...new Set(expected.map((m) => m.plot_source_url))]);
    expect(hrefs[0]).toBe(current.plot_source_url);
  });

  it("shows no attribution when nothing has a Wikipedia source", async () => {
    server.use(
      http.get(`${apiUrlRoot}/api/movies/123`, () =>
        HttpResponse.json({ ...testMoviesData[3], plot_source_url: null })
      ),
      http.get(similarUrl, () =>
        HttpResponse.json([
          { ...movie("plain", "Plain"), plot_source_url: null },
        ])
      )
    );
    renderPage("/movies/123");

    expect(await row()).toBeInTheDocument();
    expect(screen.queryByTestId("plot-attribution")).toBeNull();
  });
});
