import React from "react";
import { render, screen } from "@testing-library/react";
import MainNavigation from "./MainNavigation";

describe("<MainNavigation /> tests", () => {
  it("renders the <MainNavigation/> component", () => {
    render(<MainNavigation />);

    expect(screen.getByTestId("navigation")).not.toBeNull();
  });

  it("renders link to 'all movies'", () => {
    render(<MainNavigation />);

    expect(screen.getByText("All Movies")).not.toBeNull();
  });

  it("displays toggle button on smaller screns", () => {});
});
