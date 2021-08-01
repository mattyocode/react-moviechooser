import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";
import { ChoiceFormContainer } from "../../containers/choice-form";

import { homepageData } from "../../fixtures/homepageData";

describe("<ChoiceFormContainer/>", () => {
  const genreData = homepageData.genre;
  it("renders <ChoiceFormContainer/>", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer genreList={genreData} />
    );

    expect(getByTestId("choice-form")).toBeTruthy();
  });

  it("displays genres", () => {
    const { getByText } = render(<ChoiceFormContainer genreList={genreData} />);

    genreData.forEach((g) => expect(getByText(g)).toBeTruthy());
  });

  it("renders with genre checkboxes all unchecked", () => {
    const { getAllByTestId } = render(
      <ChoiceFormContainer genreList={genreData} />
    );
    const checkboxes = getAllByTestId("genre-checkbox");

    expect(checkboxes[0]).toHaveStyle("background-color: transparent");
    expect(checkboxes[checkboxes.length - 1]).toHaveStyle(
      "background-color: transparent"
    );
  });

  it("can check genre checkbox", () => {
    const { getAllByTestId } = render(
      <ChoiceFormContainer genreList={genreData} />
    );

    const checkbox = getAllByTestId("genre-checkbox")[0];

    expect(checkbox).toHaveStyle("background-color: transparent");

    fireEvent.click(checkbox);

    expect(checkbox).toHaveStyle("background-color: var(--clr-neon)");
  });
});
