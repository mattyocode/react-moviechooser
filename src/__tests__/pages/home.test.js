import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

import { Home } from "../../pages";

describe("<Home/> page tests", () => {
  it("renders <Home/>", () => {
    render(
      <Router>
        <Home />;
      </Router>
    );
  });
});
