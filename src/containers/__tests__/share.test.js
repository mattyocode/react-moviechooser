import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ShareContainer } from "../share";

const data = {
  title: "Parasite",
  posterPath: "/parasite.jpg",
  posterUrl: "https://example.test/parasite.jpg",
  shareUrl: "www.moviechooser.co.uk/movies/parasite",
};

describe("<ShareContainer/>", () => {
  it("shows the TMDB poster", () => {
    const { container } = render(<ShareContainer data={data} />);
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w342/parasite.jpg"
    );
  });

  it("shows the title placeholder when the movie has no poster", () => {
    const { container } = render(
      <ShareContainer data={{ ...data, posterPath: null, posterUrl: "N/A" }} />
    );
    expect(container.querySelector("img[src='N/A']")).toBeNull();
    expect(screen.getByTestId("poster-placeholder")).toHaveTextContent(
      "Parasite"
    );
  });
});
