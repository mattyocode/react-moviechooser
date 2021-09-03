import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CardContainer } from "../../containers/card";

import testMoviesData from "../../fixtures/moviesDataFromStore.json";

describe("<CardContainer/> tests", () => {
  it("renders <CardContainer/> with single movie", () => {
    const singleMovie = testMoviesData[0];
    render(<CardContainer moviesData={[singleMovie]} />);
    expect(screen.getByText(/parasite/i)).toBeInTheDocument();
  });
});
