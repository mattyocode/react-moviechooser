import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { x as xIcon } from "../../assets";
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

  it("shares on X, not Twitter", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<ShareContainer data={data} />);

    expect(screen.queryByText(/twitter/i)).toBeNull();
    const button = screen.getByRole("button", { name: "Share on X" });
    expect(xIcon).toMatch(/^data:image\/svg\+xml|x\.svg$/);
    expect(button.querySelector("img")).toHaveAttribute("src", xIcon);

    fireEvent.click(button);

    expect(open).toHaveBeenCalledTimes(1);
    const [url, target, features] = open.mock.calls[0];
    expect(url).toBe(
      "https://x.com/intent/post?text=Parasite&url=www.moviechooser.co.uk%2Fmovies%2Fparasite"
    );
    expect(target).toBe("_blank");
    expect(features).toMatch(/noopener/);
    open.mockRestore();
  });
});
