import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";
import { ChoiceFormContainer } from "../choice-form";

import homepageData from "../../fixtures/homepage.json";
import testGenreData from "../../mocks/test-data/testGenreData.json";

describe("<ChoiceFormContainer/>", () => {
  const genreData = testGenreData;
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
    genreData.forEach((g) => expect(screen.getByText(g.name)).toBeTruthy());
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
      decadeData.optionsArrayFull[
        decadeData.optionsArray.indexOf(decadeData.defaultMin)
      ]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull[
        decadeData.optionsArray.indexOf(decadeData.defaultMax)
      ]
    );
  });

  it("decade all button selects all", () => {
    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[
        decadeData.optionsArray.indexOf(decadeData.defaultMin)
      ]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull[
        decadeData.optionsArray.indexOf(decadeData.defaultMax)
      ]
    );

    const allBtn = screen.getByTestId("decade-all-btn");

    fireEvent.click(allBtn);

    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[0]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull.slice(-1)[0]
    );
  });

  it("clicking decade all button second time returns to previous values", () => {
    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[
        decadeData.optionsArray.indexOf(decadeData.defaultMin)
      ]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull[
        decadeData.optionsArray.indexOf(decadeData.defaultMax)
      ]
    );

    const allBtn = screen.getByTestId("decade-all-btn");

    fireEvent.click(allBtn);

    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[0]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull.slice(-1)[0]
    );

    fireEvent.click(allBtn);

    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[
        decadeData.optionsArray.indexOf(decadeData.defaultMin)
      ]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull[
        decadeData.optionsArray.indexOf(decadeData.defaultMax)
      ]
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

    const submitBtn = screen.getByText(/get movies/i);

    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      decade: { max: "2020", min: "1970" },
      genre: [],
      runtime: { max: "120", min: "75" },
    });
  });

  it("Submit btn returns selected values", () => {
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

    const horrorGenre = screen.getByText(/horror/i);
    fireEvent.click(horrorGenre);

    const decadeMinThumb = screen.getByTestId("decade-thumb-min");
    const decadeMaxThumb = screen.getByTestId("decade-thumb-max");

    fireEvent.change(decadeMinThumb, { target: { value: 0 } });
    fireEvent.change(decadeMaxThumb, {
      target: { value: decadeData.optionsArray.length - 1 },
    });

    const runtimeMinThumb = screen.getByTestId("runtime-thumb-min");
    const runtimeMaxThumb = screen.getByTestId("runtime-thumb-max");

    fireEvent.change(runtimeMinThumb, { target: { value: 0 } });
    fireEvent.change(runtimeMaxThumb, {
      target: { value: runtimeData.optionsArray.length - 1 },
    });

    const submitBtn = screen.getByText(/get movies/i);

    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      decade: { max: "2020", min: "pre" },
      genre: [11],
      runtime: { max: ">150", min: "<75" },
    });
  });
});
