import React from "react";
import { cleanup, screen, render, waitFor } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { MemoryRouter, Route } from "react-router-dom";
import { server, rest } from "../../mocks/server";
import "@testing-library/jest-dom";

// import { reduxTestRender } from "../../mocks/test-utils";
import store from "../../store/index";
import emptyListData from "../../mocks/test-data/testEmptyListData.json";
import listData from "../../mocks/test-data/testListData.json";
import { List } from "..";

describe("<List/> page tests", () => {
  const apiUrl = `${process.env.REACT_APP_API}/list/`;
  window.scrollTo = jest.fn();
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders List page with no items added to list", async () => {
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(emptyListData));
      })
    );
    render(
      <reactRedux.Provider store={store}>
        <List />
      </reactRedux.Provider>
    );
    expect(screen.getByText(/no unwatched movies on your list/i)).toBeTruthy();
    expect(screen.getByText(/no watched movies on your list/i)).toBeTruthy();
  });

  it("renders List page with test items", async () => {
    server.use(
      rest.get(`${apiUrl}`, async (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(listData));
      })
    );
    render(
      <reactRedux.Provider store={store}>
        <List />
      </reactRedux.Provider>
    );
    await waitFor(() => {
      listData.results.forEach((item) => {
        expect(screen.getByTestId(`${item.movie.title}-card`)).toBeTruthy();
      });
    });
  });
});
