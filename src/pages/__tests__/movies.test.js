import React from "react";
import { act, cleanup, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { server, rest } from "../../mocks/server";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { reduxTestRender } from "../../mocks/test-utils";
import testMoviesData from "../../mocks/test-data/testMoviesData.json";
import { NavbarContainer } from "../../containers/navigation";
import { Movies } from "..";

const apiUrl = `${import.meta.env.VITE_API}/movies`;
const testQueryParams = {
  genre: [],
  decade: {
    min: "70s",
    max: "20s",
  },
  runtime: {
    min: "75m",
    max: "2h",
  },
};

describe("<Movies/> page tests", () => {
  window.scrollTo = vi.fn();
  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders Movie page with queryParams and movies in Redux state", async () => {
    const initialState = {
      queryParams: testQueryParams,
      movies: testMoviesData,
      status: "succeeded",
      error: null,
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });
    expect(screen.getByTestId("movies")).toBeTruthy();
    expect(await screen.findByText(/Jurassic Park/i)).toBeTruthy();
  });

  it("shows an empty state when no movies match", () => {
    const initialState = {
      queryParams: testQueryParams,
      movies: [],
      totalCount: 0,
      status: "succeeded",
      error: null,
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
    expect(screen.queryByText(/that's all/i)).not.toBeInTheDocument();
  });

  it("shows error on 404 response to GET request", async () => {
    cleanup();
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Not found" }));
      })
    );
    const initialState = {
      queryParams: testQueryParams,
      status: "failed",
      movies: [],
      error: "not loaded",
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });
    expect(screen.getByTestId("movies")).toBeTruthy();
    expect(await screen.findByText(/error/i)).toBeTruthy();
    expect(await screen.findByText(/not loaded/i)).toBeTruthy();
  });

  it("shows loading spinner before card data loads", () => {
    const initialState = {
      queryParams: testQueryParams,
      status: "loading",
      movies: [],
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("redirects to homepage with no queryParams in Redux state", async () => {
    const initialState = {
      queryParams: undefined,
      movies: testMoviesData,
      status: "idle",
      error: null,
    };

    reduxTestRender(
      <MemoryRouter initialEntries={["/movies"]}>
        <Route path="/" exact>
          <p>Homepage</p>
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </MemoryRouter>,
      { preloadedState: { movies: initialState } }
    );
    expect(await screen.findByText(/homepage/i)).toBeTruthy();
  });
});

describe("add to list tests", () => {
  const authorizedInitialAuthState = {
    token: "testtoken",
    refreshToken: "test-refresh-token",
    account: { name: "test-user", email: "test@email.com" },
    status: "idle",
    error: null,
  };
  const unauthorizedInitialAuthState = {
    token: null,
    refreshToken: null,
    account: null,
    status: "idle",
    error: null,
  };
  const initialMoviesState = {
    queryParams: testQueryParams,
    movies: testMoviesData,
    status: "idle",
    error: null,
    totalCount: 4,
    nextPageUrl: null,
  };

  window.scrollTo = vi.fn();
  afterAll(() => {
    vi.clearAllMocks();
  });

  it("adds movie to list on bookmark click (if logged in)", async () => {
    reduxTestRender(<Movies />, {
      preloadedState: {
        auth: { auth: authorizedInitialAuthState },
        movies: initialMoviesState,
      },
    });

    const bookmarkAddButton = screen.getByTestId(/parasite-add/i);
    expect(bookmarkAddButton).toBeTruthy();

    act(() => {
      userEvent.click(bookmarkAddButton);
    });

    expect(await screen.findByTestId(/parasite-remove/i)).toBeTruthy();
    expect(screen.queryByTestId(/parasite-add/i)).toBeFalsy();
  });

  it("shows auth modal on bookmark click (if not logged in)", async () => {
    reduxTestRender(
      <MemoryRouter>
        <NavbarContainer />
        <Movies />
      </MemoryRouter>,
      {
        preloadedState: {
          auth: { auth: unauthorizedInitialAuthState },
          movies: initialMoviesState,
        },
      }
    );

    const bookmarkAddButton = screen.getByTestId(/parasite-unauthed/i);
    expect(bookmarkAddButton).toBeTruthy();

    act(() => {
      userEvent.click(bookmarkAddButton);
    });

    expect(await screen.findByTestId(/login-form/i)).toBeTruthy();
  });

  it("summarises the search and links back to edit it", async () => {
    const initialState = {
      queryParams: {
        genre: [5, 8],
        decade: { min: "1970", max: "2020" },
        runtime: { min: "75", max: "120" },
      },
      movies: testMoviesData,
      totalCount: 4,
      status: "succeeded",
      error: null,
    };
    const genres = [
      { id: 5, name: "Drama" },
      { id: 8, name: "Crime" },
    ];

    reduxTestRender(
      <MemoryRouter initialEntries={["/movies"]}>
        <Route path="/" exact>
          <p>Homepage</p>
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </MemoryRouter>,
      {
        preloadedState: {
          movies: initialState,
          options: { options: genres, status: "succeeded", error: null },
        },
      }
    );

    expect(screen.getByText("Drama, Crime")).toBeInTheDocument();
    expect(screen.getByText("1970s – Current")).toBeInTheDocument();
    expect(screen.getByText("75m – 2h")).toBeInTheDocument();
    expect(screen.getByTestId("results-count")).toHaveTextContent("4 movies");

    userEvent.click(screen.getByTestId("edit-filters-btn"));
    expect(await screen.findByText(/homepage/i)).toBeInTheDocument();
  });

  it("shows results as poster cards linking to each movie", () => {
    const initialState = {
      queryParams: testQueryParams,
      movies: testMoviesData,
      totalCount: 4,
      status: "succeeded",
      error: null,
    };

    reduxTestRender(<Movies />, { preloadedState: { movies: initialState } });

    expect(
      screen.getByRole("link", { name: /parasite – details/i })
    ).toHaveAttribute("href", `/movies/${testMoviesData[0].slug}`);
  });
});
