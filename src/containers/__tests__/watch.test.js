import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SWRConfig } from "swr";

import { rest, server } from "../../mocks/server";
import { countWatchRequests } from "../../mocks/watch-requests";
import watchData from "../../mocks/test-data/testWatchData.json";
import { COUNTRY_STORAGE_KEY } from "../../utils/watch-country";
import { WatchContainer } from "../watch";

const movie = {
  title: "Parasite",
  slug: "parasite",
  poster_url: "https://example.test/parasite.jpg",
  poster_path: "/parasite.jpg",
};

function renderPanel() {
  return render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <WatchContainer movie={movie} />
    </SWRConfig>,
  );
}

describe("<WatchContainer/>", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.spyOn(window.navigator, "language", "get").mockReturnValue("en-GB");
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a loading indicator, then one list of services in API order", async () => {
    countWatchRequests();
    renderPanel();

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeNull();

    const list = await screen.findByRole("list");
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(["Netflix", "Some Streamer", "Apple TV"]);
    for (const heading of ["Stream", "Rent", "Buy"]) {
      expect(screen.queryByRole("heading", { name: heading })).toBeNull();
    }
    expect(screen.queryByTestId("loading-spinner")).toBeNull();
  });

  it("shows a service offered in more than one way only once", async () => {
    server.use(
      rest.get("*/api/movies/:slug/watch/", (req, res, ctx) =>
        res(
          ctx.json({
            ...watchData.providers,
            providers: [
              { provider_id: 8, name: "Netflix", kind: "stream", logo: null },
              { provider_id: 2, name: "Apple TV", kind: "rent", logo: null },
              { provider_id: 2, name: "Apple TV", kind: "buy", logo: null },
              { provider_id: 130, name: "Sky Store", kind: "buy", logo: null },
            ],
          }),
        ),
      ),
    );
    renderPanel();

    const list = await screen.findByRole("list");
    expect(
      within(list)
        .getAllByRole("listitem")
        .map((li) => li.textContent),
    ).toEqual(["Netflix", "Apple TV", "Sky Store"]);
  });

  it("shows the poster in portrait, beside the options", async () => {
    countWatchRequests();
    const { container } = renderPanel();

    await screen.findByRole("list");
    const poster = container.querySelector(
      `img[src="https://image.tmdb.org/t/p/w342${movie.poster_path}"]`,
    );
    expect(poster).toHaveClass("portrait");
  });

  it("shows the title placeholder when the movie has no poster", async () => {
    countWatchRequests();
    render(
      <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
        <WatchContainer
          movie={{ ...movie, poster_path: null, poster_url: "N/A" }}
        />
      </SWRConfig>,
    );

    await screen.findByRole("list");
    expect(screen.getByTestId("poster-placeholder")).toHaveTextContent(
      "Parasite",
    );
  });

  it("uses our icon for known services and TMDB's logo for others", async () => {
    countWatchRequests();
    renderPanel();

    const netflix = (await screen.findByText("Netflix")).parentElement;
    expect(netflix.querySelector("img").getAttribute("src")).not.toMatch(
      /image\.tmdb\.org/,
    );
    const other = screen.getByText("Some Streamer").parentElement;
    expect(other.querySelector("img")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w92/streamer.jpg",
    );
  });

  it("has one watch-page button that opens in a new tab", async () => {
    countWatchRequests();
    renderPanel();

    const cta = await screen.findByRole("link", {
      name: "Where to watch in United Kingdom",
    });
    expect(cta).toHaveAttribute("href", watchData.providers.link);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("credits JustWatch when services are shown", async () => {
    countWatchRequests();
    renderPanel();

    await screen.findByText("Netflix");
    expect(screen.getByText(/streaming data from/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "JustWatch" })).toHaveAttribute(
      "href",
      "https://www.justwatch.com",
    );
  });

  it("says when nothing is streaming, and keeps the button", async () => {
    vi.spyOn(window.navigator, "language", "get").mockReturnValue("mn-MN");
    countWatchRequests(() => [200, watchData.empty]);
    renderPanel();

    const name = new Intl.DisplayNames(["mn-MN"], { type: "region" }).of("MN");
    expect(
      await screen.findByText(`Not streaming in ${name} right now`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `Where to watch in ${name}` }),
    ).toHaveAttribute("href", watchData.empty.link);
    expect(screen.getByText(/streaming data from/i)).toBeInTheDocument();
  });

  it("shows an error, not the empty state, when the request fails", async () => {
    countWatchRequests(() => [500, { detail: "boom" }]);
    renderPanel();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /couldn't load streaming information/i,
    );
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/not streaming in/i)).toBeNull();
  });

  it("shows the error with the button when TMDB is unavailable", async () => {
    countWatchRequests(() => [200, watchData.unavailable]);
    renderPanel();

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Where to watch in United Kingdom" }),
    ).toHaveAttribute("href", watchData.unavailable.link);
    expect(screen.queryByText(/not streaming in/i)).toBeNull();
  });

  it("retries and then shows the services", async () => {
    let calls = 0;
    countWatchRequests((req) => {
      calls += 1;
      return calls === 1
        ? [500, { detail: "boom" }]
        : [200, { ...watchData.providers, country: "GB" }];
    });
    renderPanel();

    userEvent.click(await screen.findByRole("button", { name: "Try again" }));
    expect(await screen.findByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("shows the loading state while a retry is in flight", async () => {
    let calls = 0;
    let release;
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    // The retry's response waits for release(), so the test can look at the
    // panel while it's in flight.
    const url = `${import.meta.env.VITE_API}/api/movies/:slug/watch/`;
    server.use(
      rest.get(url, async (req, res, ctx) => {
        calls += 1;
        if (calls === 1) {
          return res(ctx.status(500), ctx.json({ detail: "boom" }));
        }
        await gate;
        return res(ctx.json({ ...watchData.providers, country: "GB" }));
      }),
    );
    renderPanel();

    userEvent.click(await screen.findByRole("button", { name: "Try again" }));
    expect(await screen.findByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.queryByRole("button", { name: "Try again" })).toBeNull();

    release();
    expect(await screen.findByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-spinner")).toBeNull();
  });

  it("shows the error again when a retry fails the same way", async () => {
    const seen = countWatchRequests(() => [500, { detail: "boom" }]);
    renderPanel();

    userEvent.click(await screen.findByRole("button", { name: "Try again" }));
    await waitFor(() => expect(seen).toHaveLength(2));
    expect(
      await screen.findByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-spinner")).toBeNull();
  });

  it("keeps showing loaded services if a later refresh fails", async () => {
    let status = 200;
    const seen = countWatchRequests(() => [
      status,
      status === 200 ? { ...watchData.providers, country: "GB" } : {},
    ]);
    // One SWRConfig throughout, so the cache survives closing the panel.
    const config = { provider: () => new Map(), dedupingInterval: 0 };
    const panel = (open) => (
      <SWRConfig value={config}>
        {open && <WatchContainer movie={movie} />}
      </SWRConfig>
    );
    const { rerender } = render(panel(true));
    await screen.findByText("Netflix");
    rerender(panel(false));

    // Reopening shows the stored data and refreshes it in the background.
    status = 500;
    rerender(panel(true));
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    await waitFor(() => expect(seen).toHaveLength(2));
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(screen.getByText("Netflix")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("starts from the browser's country", async () => {
    vi.spyOn(window.navigator, "language", "get").mockReturnValue("en-US");
    const seen = countWatchRequests();
    renderPanel();

    await screen.findByText("Netflix");
    expect(seen).toHaveLength(1);
    expect(seen[0]).toMatch(/country=US$/);
  });

  it("changing country refetches and is remembered", async () => {
    const seen = countWatchRequests();
    renderPanel();
    await screen.findByText("Netflix");

    const picker = screen.getByLabelText("Country");
    await waitFor(() =>
      expect(
        within(picker).getByRole("option", { name: "Japan" }),
      ).toBeInTheDocument(),
    );
    userEvent.selectOptions(picker, "JP");

    expect(
      await screen.findByRole("link", { name: "Where to watch in Japan" }),
    ).toBeInTheDocument();
    expect(seen[seen.length - 1]).toMatch(/country=JP$/);
    expect(window.localStorage.getItem(COUNTRY_STORAGE_KEY)).toBe("JP");
  });

  it("opens on the remembered country next time", async () => {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, "DE");
    const seen = countWatchRequests();
    renderPanel();

    expect(
      await screen.findByRole("link", { name: "Where to watch in Germany" }),
    ).toBeInTheDocument();
    expect(seen[0]).toMatch(/country=DE$/);
    expect(screen.getByLabelText("Country")).toHaveValue("DE");
  });
});
