import React from "react";
import { render } from "@testing-library/react";

import Headline from "./index";

describe("<Headline />", () => {
  it("renders <Headline /> component", () => {
    const { getByText } = render(
      <Headline>
        <Headline.Title>Stop deciding, start watching</Headline.Title>
        <Headline.Subhead>Some more text</Headline.Subhead>
      </Headline>
    );

    expect(getByText("Stop deciding, start watching")).toBeTruthy();
  });
});
