import React from "react";
import { render } from "@testing-library/react";
import { ChoiceFormContainer } from "../../containers/choice-form";

import { homepageData } from "../../fixtures/homepageData";

describe("<ChoiceFormContainer/>", () => {
  it("renders <ChoiceFormContainer/>", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer genreList={homepageData.genre} />
    );

    expect(getByTestId("choice-form")).toBeTruthy();
  });

  it("displays genres", () => {
    const { getByText } = render(
      <ChoiceFormContainer genreList={homepageData.genre} />
    );

    expect(getByText("Comedy", { exact: false })).toBeTruthy();
  });
});
