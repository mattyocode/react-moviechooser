import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

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
      expect(screen.getByText("70s")).toBeTruthy();
      expect(screen.getByText("75m")).toBeTruthy();
    });
  });
});
