import React from "react";
import { render } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";
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

  it("renders with genre checkboxes all unchecked", () => {
    const { getAllByTestId } = render(
      <ChoiceFormContainer genreList={homepageData.genre} />
    );
    const checkboxes = getAllByTestId("genre-checkbox");

    expect(checkboxes[0]).toHaveStyle("background-color: transparent");
    expect(checkboxes[checkboxes.length - 1]).toHaveStyle(
      // "background-color: #12bbd4"
      "background-color: transparent"
    );
  });

  it("can check genre checkbox", () => {
    const {} = render(<ChoiceFormContainer genreList={homepageData.genre} />);
  });
});
