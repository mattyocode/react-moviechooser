import React from "react";
import { cleanup, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../mocks/server";
import "@testing-library/jest-dom";

import { reduxTestRender } from "../../mocks/test-utils";
import emptyListData from "../../mocks/test-data/testEmptyListData.json";
import listData from "../../mocks/test-data/testListData.json";
import { List } from "..";

describe("<List/> page tests", () => {
  const apiUrl = `${process.env.REACT_APP_API}/list/`;

  const authorizedInitialAuthState = {
    token: "testtoken",
    refreshToken: "test-refresh-token",
    account: { username: "test-user", email: "test@email.com" },
    status: "idle",
    error: null,
  };

  window.scrollTo = jest.fn();
  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    cleanup();
  });

  it("renders List page with no items added to list", async () => {
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(emptyListData));
      })
    );
    reduxTestRender(<List />, {
      preloadedState: { auth: { auth: authorizedInitialAuthState } },
    });
    expect(screen.getByText(/no unwatched movies on your list/i)).toBeTruthy();
    expect(screen.getByText(/no watched movies on your list/i)).toBeTruthy();
  });

  it("renders List page with test items", async () => {
    reduxTestRender(<List />, {
      preloadedState: { auth: { auth: authorizedInitialAuthState } },
    });
    await waitFor(() => {
      listData.results.forEach((item) => {
        expect(screen.getByTestId(`${item.movie.title}-card`)).toBeTruthy();
      });
    });
  });

  it("removes item from list on click to bookmark", async () => {
    let testListData = listData;
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(testListData));
      }),
      rest.delete(`${apiUrl}:movieSlug/`, async (req, res, ctx) => {
        const { movieSlug } = req.params;
        testListData = testListData.results.filter(
          (result) => result.movie.slug !== movieSlug
        );
        return res(
          ctx.status(200),
          ctx.json({ deleted: `test-item-uid-${movieSlug}` })
        );
      })
    );
    reduxTestRender(<List />, {
      preloadedState: { auth: { auth: authorizedInitialAuthState } },
    });

    const firstItem = listData.results[0].movie;

    const bookmarkButton = await screen.findByTestId(
      `${firstItem.title}-remove`
    );

    act(() => {
      userEvent.click(bookmarkButton);
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId(`${firstItem.title}-card`)
      ).not.toBeInTheDocument();
    });
  });

  it("toggle list item unwatched/watched on click", async () => {
    reduxTestRender(<List />, {
      preloadedState: { auth: { auth: authorizedInitialAuthState } },
    });
    const unwatchedItem = listData.results[0].movie;

    let unwatchedItemWatchedButton = await screen.findByTestId(
      `${unwatchedItem.title}-watchedBtn`
    );

    expect(unwatchedItemWatchedButton.getAttribute("fill")).toBe("#666");
    expect(screen.getByText(/no watched movies on your list/i)).toBeTruthy();

    act(() => {
      userEvent.click(unwatchedItemWatchedButton);
    });

    await waitFor(() => {
      expect(
        screen
          .getByTestId(`${unwatchedItem.title}-watchedBtn`)
          .getAttribute("fill")
      ).toBe("#fff");
      expect(screen.queryByText(/no watched movies on your list/i)).toBeFalsy();
    });

    unwatchedItemWatchedButton = await screen.findByTestId(
      `${unwatchedItem.title}-watchedBtn`
    );

    act(() => {
      userEvent.click(unwatchedItemWatchedButton);
    });

    await waitFor(() => {
      expect(
        screen
          .getByTestId(`${unwatchedItem.title}-watchedBtn`)
          .getAttribute("fill")
      ).toBe("#666");
      expect(screen.getByText(/no watched movies on your list/i)).toBeTruthy();
    });
  });
});
