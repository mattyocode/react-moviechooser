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
    </MemoryRouter>
  );

describe("<PosterCard/>", () => {
  it("links the poster to the movie page", () => {
    renderPoster({ src: "poster.jpg" });
    expect(
      screen.getByRole("link", { name: /test movie – details/i })
    ).toHaveAttribute("href", "/movies/test-movie");
    expect(screen.getByText("91.0")).toBeInTheDocument();
  });

  it("shows a title placeholder when the poster fails to load", () => {
    const { container } = renderPoster({ src: "broken.jpg" });
    fireEvent.error(container.querySelector("img"));
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
  });

  it("shows the placeholder when there is no poster", () => {
    renderPoster({ src: "" });
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("labels icon-only actions", () => {
    render(
      <PosterCard.Action label="Share">
        <svg />
      </PosterCard.Action>
    );
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
  });
});
