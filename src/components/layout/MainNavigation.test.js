import React from "react";
import { render, screen } from "@testing-library/react";
import MainNavigation from "./MainNavigation";

describe("<MainNavigation /> tests", () => {
  it("renders the <MainNavigation/> component", () => {
    render(<MainNavigation />);

    expect(screen.getByTextLabel("menu")).toBeInTheDocument();
  });
});
