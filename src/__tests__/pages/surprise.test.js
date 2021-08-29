import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { server, rest } from "../../test/server";
import "@testing-library/jest-dom";

import { Surprise } from "../../pages";

describe("<Movies/> page tests", () => {
  const apiUrl = `${process.env.REACT_APP_TEST_API}/random`;

  it("renders <Surprise/> page with movie", () => {
    render(<Surprise />);
    expect(screen.getByTestId("surprise")).toBeInTheDocument();
  });

  it("shows loading spinner initally", () => {
    render(<Surprise />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows movie card once loaded", async () => {
    render(<Surprise />);
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
    render(<Surprise />);
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
