import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";
import { ChoiceFormContainer } from "../../containers/choice-form";

import homepageData from "../../fixtures/homepage.json";

describe("<ChoiceFormContainer/>", () => {
  const genreData = homepageData.genre;
  const runtimeData = homepageData.runtime;
  const decadeData = homepageData.decade;
  beforeEach(() => {
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={runtimeData}
        decadeData={decadeData}
        onSubmitHandler={() => {}}
      />
    );
  });

  it("renders <ChoiceFormContainer/>", () => {
    expect(screen.getByTestId("choice-form")).toBeTruthy();
  });

  it("displays genres", () => {
    genreData.forEach((g) => expect(screen.getByText(g)).toBeTruthy());
  });

  it("renders with genre checkboxes all unchecked", () => {
    const checkboxes = screen.getAllByTestId("genre-checkbox");

    expect(checkboxes[0]).toHaveStyle("background-color: transparent");
    expect(checkboxes[checkboxes.length - 1]).toHaveStyle(
      "background-color: transparent"
    );
  });

  it("can check genre checkbox", () => {
    const checkbox = screen.getAllByTestId("genre-checkbox")[0];

    expect(checkbox).toHaveStyle("background-color: transparent");

    fireEvent.click(checkbox);

    expect(checkbox).toHaveStyle("background-color: var(--clr-neon)");
  });

  it("genre all button selects all", () => {
    const checkbox = screen.getAllByTestId("genre-checkbox")[0];

    expect(checkbox).toHaveStyle("background-color: transparent");

    const allBtn = screen.getByTestId("genre-all-btn");

    fireEvent.click(allBtn);

    expect(checkbox).toHaveStyle("background-color: var(--clr-neon)");
  });

  it("genre all button styling changes on click", () => {
    const allBtn = screen.getByTestId("genre-all-btn");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: #aaa");
  });

  it("displays Decade panel", () => {
    expect(screen.getByText("Runtime")).toBeTruthy();
  });

  it("renders Decade slider with default values", () => {
    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.defaultMin
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.defaultMax
    );
  });

  it("decade all button selects all", () => {
    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.defaultMin
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.defaultMax
    );

    const allBtn = screen.getByTestId("decade-all-btn");

    fireEvent.click(allBtn);

    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArray[0]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArray.slice(-1)[0]
    );
  });

  it("clicking decade all button second time returns to previous values", () => {
    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.defaultMin
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.defaultMax
    );

    const allBtn = screen.getByTestId("decade-all-btn");

    fireEvent.click(allBtn);

    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArray[0]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArray.slice(-1)[0]
    );

    fireEvent.click(allBtn);

    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.defaultMin
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.defaultMax
    );
  });

  it("decade all button styling changes on click", () => {
    const allBtn = screen.getByTestId("decade-all-btn");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: #aaa");
  });

  it("displays Runtime panel", () => {
    expect(screen.getByText("Runtime")).toBeTruthy();
  });

  it("renders Runtime slider with default values", () => {
    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.defaultMin
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.defaultMax
    );
  });

  it("Runtime all button selects all", () => {
    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.defaultMin
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.defaultMax
    );

    const allBtn = screen.getByTestId("runtime-all-btn");

    fireEvent.click(allBtn);

    expect(screen.getByTestId("runtime-min-val").value).not.toBe(
      runtimeData.defaultMin
    );
    expect(screen.getByTestId("runtime-max-val").value).not.toBe(
      runtimeData.defaultMax
    );
    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.optionsArray[0]
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.optionsArray.slice(-1)[0]
    );
  });

  it("clicking Runtime all button second time returns to previous values", () => {
    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.defaultMin
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.defaultMax
    );

    const allBtn = screen.getByTestId("runtime-all-btn");

    fireEvent.click(allBtn);

    expect(screen.getByTestId("runtime-min-val").value).not.toBe(
      runtimeData.defaultMin
    );
    expect(screen.getByTestId("runtime-max-val").value).not.toBe(
      runtimeData.defaultMax
    );
    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.optionsArray[0]
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.optionsArray.slice(-1)[0]
    );

    fireEvent.click(allBtn);

    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.defaultMin
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.defaultMax
    );
  });

  it("Runtime all button styling changes on click", () => {
    const allBtn = screen.getByTestId("runtime-all-btn");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: #aaa");
  });

  it("renders submit buttons", () => {
    expect(screen.getByTestId("submit-btns")).toBeTruthy();
  });

  it("Submit btn returns default form values if no selections made", () => {
    cleanup();
    const mockOnSubmit = jest.fn();
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={runtimeData}
        decadeData={decadeData}
        onSubmitHandler={mockOnSubmit}
      />
    );

    const submitBtn = screen.getByText(/matches/i);

    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      decade: { max: "20s", min: "70s" },
      genre: [],
      runtime: { max: "2h", min: "75m" },
    });
  });
});
