import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import PosterCard from ".";

const renderPoster = (props) =>
  render(
    <MemoryRouter>
      <PosterCard>
        <PosterCard.Poster
          to="/movies/test-movie"
          title="Test Movie"
          rating="91.0"
          plot="A test plot."
          {...props}
        />
      </PosterCard>
    </MemoryRouter>,
  );

describe("<PosterCard/>", () => {
  it("links the poster to the movie page", () => {
    renderPoster({ path: "/poster.jpg" });
    expect(
      screen.getByRole("link", { name: /test movie – details/i }),
    ).toHaveAttribute("href", "/movies/test-movie");
    expect(screen.getByText("91.0")).toBeInTheDocument();
  });

  it("loads the TMDB poster", () => {
    const { container } = renderPoster({
      path: "/poster.jpg",
      url: "omdb.jpg",
    });
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w342/poster.jpg",
    );
  });

  it("shows a title placeholder when both posters fail to load", () => {
    const { container } = renderPoster({
      path: "/broken.jpg",
      url: "broken.jpg",
    });
    fireEvent.error(container.querySelector("img"));
    fireEvent.error(container.querySelector("img"));
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
  });

  it("shows the placeholder when there is no poster", () => {
    renderPoster({ path: null, url: "N/A" });
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("labels icon-only actions", () => {
    render(
      <PosterCard.Action label="Share">
        <svg />
      </PosterCard.Action>,
    );
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
  });

  it("shows a match label when given one", () => {
    renderPoster({ path: "/poster.jpg", match: "Top match" });
    expect(screen.getByTestId("match-label")).toHaveTextContent("Top match");
  });

  it("shows no match label by default", () => {
    renderPoster({ path: "/poster.jpg" });
    expect(screen.queryByTestId("match-label")).toBeNull();
  });
});
