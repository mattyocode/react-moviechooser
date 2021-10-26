import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CardContainer } from "../../containers/card";

import testMoviesData from "../../fixtures/updatedMoviesData.json";

describe("<CardContainer/> tests", () => {
  it("renders <CardContainer/> with single movie", () => {
    const singleMovie = testMoviesData[0];
    render(<CardContainer movie={singleMovie} />);
    expect(screen.getByText(/parasite/i)).toBeInTheDocument();
  });

  it("launches ondemand modal on click", () => {
    const singleMovie = testMoviesData[0];
    render(<CardContainer movie={singleMovie} />);

    const ondemandBtn = screen.getByTestId(/parasite-ondemand/i);

    singleMovie.ondemand.forEach((o) =>
      expect(screen.queryByText(o.service)).not.toBeInTheDocument()
    );

    fireEvent.click(ondemandBtn);

    singleMovie.ondemand.forEach((o) =>
      expect(screen.getByText(o.service)).toBeInTheDocument()
    );
  });

  it("closes ondemand modal on click", async () => {
    const singleMovie = testMoviesData[0];
    console.log("movie in ondemand", singleMovie);
    render(<CardContainer movie={singleMovie} />);

    const ondemandBtn = screen.getByTestId(/parasite-ondemand/i);
    fireEvent.click(ondemandBtn);

    await waitFor(() => {
      singleMovie.ondemand.forEach((o) =>
        expect(screen.getByText(o.service)).toBeInTheDocument()
      );
    });

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);

    await waitFor(() => {
      singleMovie.ondemand.forEach((o) =>
        expect(screen.queryByText(o.service)).not.toBeInTheDocument()
      );
    });
  });
});
