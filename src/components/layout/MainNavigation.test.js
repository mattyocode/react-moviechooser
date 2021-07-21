import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("toggle button changes visibility in state", () => {
    render(<MainNavigation />);

    expect(screen.getByTestId("toggle-btn")).toBeTruthy();

    // const toggleBtn = screen.getByTestId("toggle-btn");
    // fireEvent.click(toggleBtn)
    // expect()
  });
});
