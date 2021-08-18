import React from "react";
import { render, screen } from "@testing-library/react";

import Headline from "./index";

describe("<Headline />", () => {
  it("renders <Headline /> component", () => {
    render(
      <Headline>
        <Headline.Title>Stop deciding, start watching</Headline.Title>
        <Headline.Subhead>Some more text</Headline.Subhead>
      </Headline>
    );

    expect(screen.getByText("Stop deciding, start watching")).toBeTruthy();
    expect(screen.getByText("Some more text")).toBeTruthy();
    expect(screen.getByTestId("headline")).toBeTruthy();
  });
});
