import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import PlotAttribution from ".";

const drive = {
  title: "Drive",
  plot_source_url: "https://en.wikipedia.org/wiki/Drive_(2011_film)?oldid=1",
};

describe("<PlotAttribution/>", () => {
  it("credits Wikipedia under CC BY-SA 4.0 and links each article", () => {
    render(
      <PlotAttribution
        movies={[drive, { title: "Fantasia", plot_source_url: null }]}
      />
    );

    const details = screen.getByTestId("plot-attribution");
    expect(within(details).getByText("About these recommendations"))
      .toBeInTheDocument();
    expect(details).toHaveTextContent(/plot summaries from Wikipedia/);
    expect(
      within(details).getByRole("link", { name: "CC BY-SA 4.0", hidden: true })
    ).toHaveAttribute("href", "https://creativecommons.org/licenses/by-sa/4.0/");
    expect(
      within(details).getByRole("link", { name: "Drive", hidden: true })
    ).toHaveAttribute("href", drive.plot_source_url);
    expect(within(details).queryByText("Fantasia")).toBeNull();
  });

  it("starts collapsed", () => {
    render(<PlotAttribution movies={[drive]} />);

    expect(screen.getByTestId("plot-attribution")).not.toHaveAttribute("open");
  });

  it("links an article once even if a movie appears twice", () => {
    render(<PlotAttribution movies={[drive, drive]} />);

    expect(
      screen.getAllByRole("link", { name: "Drive", hidden: true })
    ).toHaveLength(1);
  });

  it("renders nothing when no movie has a Wikipedia source", () => {
    render(
      <PlotAttribution movies={[{ title: "Fantasia", plot_source_url: null }]} />
    );

    expect(screen.queryByTestId("plot-attribution")).toBeNull();
  });
});
