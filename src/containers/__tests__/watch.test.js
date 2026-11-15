import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SWRConfig } from "swr";

import { countWatchRequests } from "../../mocks/watch-requests";
import watchData from "../../mocks/test-data/testWatchData.json";
import { COUNTRY_STORAGE_KEY } from "../../utils/watch-country";
import { WatchContainer } from "../watch";

const movie = {
  title: "Parasite",
  slug: "parasite",
  poster_url: "https://example.test/parasite.jpg",
};

function renderPanel() {
  return render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      <WatchContainer movie={movie} />
    </SWRConfig>
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

  it("shows a loading indicator, then services grouped by kind", async () => {
    countWatchRequests();
    renderPanel();

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Stream" })).toBeNull();

    const stream = (await screen.findByRole("heading", { name: "Stream" }))
      .parentElement;
    expect(within(stream).getByText("Netflix")).toBeInTheDocument();
    expect(within(stream).getByText("Some Streamer")).toBeInTheDocument();
    const buy = screen.getByRole("heading", { name: "Buy" }).parentElement;
    expect(within(buy).getByText("Apple TV")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Rent" })).toBeNull();
    expect(screen.queryByTestId("loading-spinner")).toBeNull();
  });

  it("shows the poster in portrait, beside the options", async () => {
    countWatchRequests();
    const { container } = renderPanel();

    await screen.findByRole("heading", { name: "Stream" });
    const poster = container.querySelector(`img[src="${movie.poster_url}"]`);
    expect(poster).toHaveClass("portrait");
  });

  it("uses our icon for known services and TMDB's logo for others", async () => {
    countWatchRequests();
    renderPanel();

    const netflix = (await screen.findByText("Netflix")).parentElement;
    expect(netflix.querySelector("img").getAttribute("src")).not.toMatch(
      /image\.tmdb\.org/
    );
    const other = screen.getByText("Some Streamer").parentElement;
    expect(other.querySelector("img")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w92/streamer.jpg"
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
      "https://www.justwatch.com"
    );
  });

  it("says when nothing is streaming, and keeps the button", async () => {
    vi.spyOn(window.navigator, "language", "get").mockReturnValue("mn-MN");
    countWatchRequests(() => [200, watchData.empty]);
    renderPanel();

    const name = new Intl.DisplayNames(["mn-MN"], { type: "region" }).of("MN");
    expect(
      await screen.findByText(`Not streaming in ${name} right now`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: `Where to watch in ${name}` })
    ).toHaveAttribute("href", watchData.empty.link);
    expect(screen.getByText(/streaming data from/i)).toBeInTheDocument();
  });

  it("shows an error, not the empty state, when the request fails", async () => {
    countWatchRequests(() => [500, { detail: "boom" }]);
    renderPanel();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /couldn't load streaming information/i
    );
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.queryByText(/not streaming in/i)).toBeNull();
  });

  it("shows the error with the button when TMDB is unavailable", async () => {
    countWatchRequests(() => [200, watchData.unavailable]);
    renderPanel();

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Where to watch in United Kingdom" })
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
      expect(within(picker).getByRole("option", { name: "Japan" })).toBeInTheDocument()
    );
    userEvent.selectOptions(picker, "JP");

    expect(
      await screen.findByRole("link", { name: "Where to watch in Japan" })
    ).toBeInTheDocument();
    expect(seen[seen.length - 1]).toMatch(/country=JP$/);
    expect(window.localStorage.getItem(COUNTRY_STORAGE_KEY)).toBe("JP");
  });

  it("opens on the remembered country next time", async () => {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, "DE");
    const seen = countWatchRequests();
    renderPanel();

    expect(
      await screen.findByRole("link", { name: "Where to watch in Germany" })
    ).toBeInTheDocument();
    expect(seen[0]).toMatch(/country=DE$/);
    expect(screen.getByLabelText("Country")).toHaveValue("DE");
  });
});
