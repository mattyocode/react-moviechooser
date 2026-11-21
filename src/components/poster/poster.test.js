import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Poster, { posterSources } from ".";

const OMDB = "https://m.media-amazon.com/images/heat.jpg";

const img = (container) => container.querySelector("img");

describe("posterSources", () => {
  it("builds the TMDB URL and srcset from the path, then poster_url", () => {
    expect(posterSources("/heat.jpg", OMDB)).toEqual([
      {
        src: "https://image.tmdb.org/t/p/w342/heat.jpg",
        srcSet:
          "https://image.tmdb.org/t/p/w185/heat.jpg 185w, " +
          "https://image.tmdb.org/t/p/w342/heat.jpg 342w, " +
          "https://image.tmdb.org/t/p/w500/heat.jpg 500w",
      },
      { src: OMDB },
    ]);
  });

  it.each([
    [null, "N/A"],
    [undefined, ""],
    ["", undefined],
  ])("has no sources for path %p and url %p", (path, url) => {
    expect(posterSources(path, url)).toEqual([]);
  });
});

describe("<Poster/>", () => {
  it("loads the TMDB image first", () => {
    const { container } = render(
      <Poster path="/heat.jpg" url={OMDB} title="Heat" />
    );
    expect(img(container)).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w342/heat.jpg"
    );
    expect(img(container).getAttribute("srcset")).toContain(
      "https://image.tmdb.org/t/p/w500/heat.jpg 500w"
    );
    expect(img(container)).toHaveAttribute("sizes", "342px");
  });

  it("falls back to poster_url when the TMDB image fails", () => {
    const { container } = render(
      <Poster path="/heat.jpg" url={OMDB} title="Heat" />
    );
    fireEvent.error(img(container));
    expect(img(container)).toHaveAttribute("src", OMDB);
    expect(img(container)).not.toHaveAttribute("srcset");
  });

  it("shows the title placeholder when both fail, and stops there", () => {
    const { container } = render(
      <Poster path="/heat.jpg" url={OMDB} title="Heat" />
    );
    fireEvent.error(img(container));
    fireEvent.error(img(container));
    expect(img(container)).toBeNull();
    expect(screen.getByTestId("poster-placeholder")).toHaveTextContent("Heat");
  });

  it("loads poster_url directly when there is no path", () => {
    const { container } = render(
      <Poster path={null} url={OMDB} title="Heat" />
    );
    expect(img(container)).toHaveAttribute("src", OMDB);
    expect(container.innerHTML).not.toContain("image.tmdb.org");
  });

  it("shows the placeholder at once with neither source", () => {
    const { container } = render(
      <Poster path={null} url="N/A" title="Heat" />
    );
    expect(img(container)).toBeNull();
    expect(screen.getByTestId("poster-placeholder")).toHaveTextContent("Heat");
  });

  it("starts again from TMDB for the next movie", () => {
    const { container, rerender } = render(
      <Poster path={null} url="N/A" title="Heat" />
    );
    rerender(<Poster path="/ronin.jpg" url={OMDB} title="Ronin" />);
    expect(img(container)).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w342/ronin.jpg"
    );
  });

  it("can show the placeholder without the title", () => {
    render(<Poster path={null} url="N/A" title="Heat" showTitle={false} />);
    expect(screen.getByTestId("poster-placeholder")).toBeEmptyDOMElement();
  });

  it("hides the placeholder from assistive technology", () => {
    render(<Poster path={null} url="N/A" title="Heat" />);
    expect(screen.getByTestId("poster-placeholder")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });
});
