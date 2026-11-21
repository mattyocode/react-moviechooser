import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import * as reactRedux from "react-redux";
import { CardContainer } from "../../containers/card";
import store from "../../store/index";
import testMoviesData from "../../mocks/test-data/testMoviesData.json";
import { countWatchRequests } from "../../mocks/watch-requests";
import { SWRConfig } from "swr";
import { MemoryRouter } from "react-router-dom";

const SHARE_LIST = ["Email", "Telegram", "Whatsapp", "Facebook", "X"];

describe("<CardContainer/> tests", () => {
  const singleMovie = testMoviesData[0];
  beforeEach(() => {
    render(
      <reactRedux.Provider store={store}>
        <CardContainer movie={singleMovie} />
      </reactRedux.Provider>,
    );
  });
  it("renders <CardContainer/> with single movie", () => {
    expect(screen.getByText(/parasite/i)).toBeTruthy();
  });

  it("opens the where-to-watch panel on click", async () => {
    expect(screen.queryByText(/streaming data from/i)).toBeFalsy();

    fireEvent.click(screen.getByTestId(/parasite-watch/i));

    expect(await screen.findByText(/streaming data from/i)).toBeTruthy();
    expect(screen.getByText("Netflix")).toBeTruthy();
  });

  it("closes the where-to-watch panel on click", async () => {
    fireEvent.click(screen.getByTestId(/parasite-watch/i));
    await screen.findByText(/streaming data from/i);

    fireEvent.click(screen.getByTestId("modal-backdrop"));

    await waitFor(() =>
      expect(screen.queryByText(/streaming data from/i)).toBeFalsy(),
    );
  });

  it("launches share modal on click", async () => {
    const shareBtn = screen.getByTestId(/parasite-share/i);
    SHARE_LIST.forEach((share) =>
      expect(screen.queryByText(share)).toBeFalsy(),
    );

    act(() => {
      fireEvent.click(shareBtn);
    });

    await waitFor(() => {
      SHARE_LIST.forEach((share) =>
        expect(screen.getByText(share)).toBeTruthy(),
      );
    });
  });

  it("closes share modal on click", async () => {
    const shareBtn = screen.getByTestId(/parasite-share/i);
    act(() => {
      fireEvent.click(shareBtn);
    });

    await waitFor(() => {
      SHARE_LIST.forEach((share) =>
        expect(screen.queryByText(share)).toBeTruthy(),
      );
    });

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);

    await waitFor(() => {
      SHARE_LIST.forEach((share) =>
        expect(screen.queryByText(share)).toBeFalsy(),
      );
    });
  });
});

describe("<CardContainer/> watch button", () => {
  const mapped = testMoviesData.filter((m) => m.has_tmdb);

  function renderCards(movies, variant) {
    return render(
      <reactRedux.Provider store={store}>
        <MemoryRouter>
          <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
            {movies.map((m) => (
              <CardContainer key={m.slug} movie={m} variant={variant} />
            ))}
          </SWRConfig>
        </MemoryRouter>
      </reactRedux.Provider>,
    );
  }

  it.each(["full", "poster"])(
    "shows the button only for mapped movies (%s)",
    (variant) => {
      renderCards(
        [
          { ...testMoviesData[0], has_tmdb: true },
          { ...testMoviesData[1], has_tmdb: false },
        ],
        variant,
      );
      expect(
        screen.getByTestId(`${testMoviesData[0].title}-watch`),
      ).toBeTruthy();
      expect(
        screen.queryByTestId(`${testMoviesData[1].title}-watch`),
      ).toBeNull();
    },
  );

  it.each(["full", "poster"])(
    "a page of mapped movies makes no watch requests until one is opened (%s)",
    async (variant) => {
      const seen = countWatchRequests();
      renderCards(mapped, variant);
      await new Promise((resolve) => setTimeout(resolve, 50));
      expect(seen).toHaveLength(0);

      fireEvent.click(screen.getByTestId(`${mapped[0].title}-watch`));
      await screen.findByText(/streaming data from/i);
      expect(seen).toHaveLength(1);
      expect(seen[0]).toContain(`/api/movies/${mapped[0].slug}/watch/`);
    },
  );
});

describe("<CardContainer/> posters", () => {
  const [parasite, , noPoster] = testMoviesData;

  function renderCard(movie, variant) {
    return render(
      <reactRedux.Provider store={store}>
        <MemoryRouter>
          <CardContainer movie={movie} variant={variant} />
        </MemoryRouter>
      </reactRedux.Provider>,
    );
  }

  it.each(["full", "poster"])("shows the TMDB poster (%s)", (variant) => {
    const { container } = renderCard(parasite, variant);
    expect(
      container.querySelector("img[src^='https://image.tmdb.org']"),
    ).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/w342${parasite.poster_path}`,
    );
  });

  it.each(["full", "poster"])(
    "shows a title placeholder for a movie with no poster (%s)",
    (variant) => {
      const { container } = renderCard(noPoster, variant);
      const placeholder = screen.getByTestId("poster-placeholder");
      expect(placeholder).toHaveTextContent(noPoster.title);
      expect(container.querySelector("img[src='N/A']")).toBeNull();
      expect(
        container.querySelector("img[src^='https://image.tmdb.org']"),
      ).toBeNull();
    },
  );
});
