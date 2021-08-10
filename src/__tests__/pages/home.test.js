import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { server, rest } from "../../test/server";

import { Home } from "../../pages";

describe("<Home/> page tests", () => {
  const apiUrl = `${process.env.REACT_APP_FIREBASE_TEST_API}/options`;
  it("renders <Home/>", async () => {
    render(
      <Router>
        <Home url={apiUrl} />;
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText("Sci-Fi")).toBeTruthy();
      expect(screen.getByText("Borror")).toBeTruthy();
      expect(screen.getByText("Badventure")).toBeTruthy();
      expect(screen.getByText("70s")).toBeTruthy();
      expect(screen.getByText("75m")).toBeTruthy();
    });
  });

  it("shows error on 404 response to GET request", async () => {
    server.use(
      rest.get(`${apiUrl}`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Not found" }));
      })
    );

    render(
      <Router>
        <Home url={apiUrl} />;
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeTruthy();
    });
  });
});
