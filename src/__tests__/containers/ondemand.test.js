import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { OndemandContainer } from "../../containers/ondemand";

import testMoviesData from "../../fixtures/moviesDataFromStore.json";

describe("<OndemandContainer/> tests", () => {
  it("renders <OndemandContainer/> with movie data", () => {
    const movieData = testMoviesData[0];
    const testData = {
      title: movieData.title,
      imgUrl: movieData.ondemand_img,
      linksData: movieData.ondemand,
    };

    render(<OndemandContainer data={testData} />);
    expect(screen.getByText(/parasite/i)).toBeInTheDocument();
    expect(screen.getByText(/itunes/i)).toBeInTheDocument();
    expect(screen.getByText(/google play/i)).toBeInTheDocument();
    expect(screen.getByText(/amazon prime video/i)).toBeInTheDocument();

    expect(screen.getByText(/itunes/i).closest("a")).toHaveAttribute(
      "href",
      testData.linksData[0].url
    );
    expect(screen.getByText(/google play/i).closest("a")).toHaveAttribute(
      "href",
      testData.linksData[1].url
    );
    expect(
      screen.getByText(/amazon prime video/i).closest("a")
    ).toHaveAttribute("href", testData.linksData[2].url);
  });
});
