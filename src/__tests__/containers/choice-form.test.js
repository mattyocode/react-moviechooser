import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";
import { ChoiceFormContainer } from "../../containers/choice-form";

import homepageData from "../../fixtures/homepage.json";

describe("<ChoiceFormContainer/>", () => {
  const genreData = homepageData.genre;
  const runtimeData = homepageData.runtime;
  const decadeData = homepageData.decade;
  it("renders <ChoiceFormContainer/>", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer
        url={`${process.env.REACT_APP_FIREBASE_TEST_API}/options`}
      />
    );

    expect(getByTestId("choice-form")).toBeTruthy();
  });

  it("displays genres", () => {
    const { getByText } = render(
      <ChoiceFormContainer
        url={`${process.env.REACT_APP_FIREBASE_TEST_API}/options`}
      />
    );

    genreData.forEach((g) => expect(getByText(g)).toBeTruthy());
  });

  it("renders with genre checkboxes all unchecked", () => {
    const { getAllByTestId } = render(
      <ChoiceFormContainer
        url={`${process.env.REACT_APP_FIREBASE_TEST_API}/options`}
      />
    );
    const checkboxes = getAllByTestId("genre-checkbox");

    expect(checkboxes[0]).toHaveStyle("background-color: transparent");
    expect(checkboxes[checkboxes.length - 1]).toHaveStyle(
      "background-color: transparent"
    );
  });

  it("can check genre checkbox", () => {
    const { getAllByTestId } = render(
      <ChoiceFormContainer
        url={`${process.env.REACT_APP_FIREBASE_TEST_API}/options`}
      />
    );

    const checkbox = getAllByTestId("genre-checkbox")[0];

    expect(checkbox).toHaveStyle("background-color: transparent");

    fireEvent.click(checkbox);

    expect(checkbox).toHaveStyle("background-color: var(--clr-neon)");
  });

  it("genre all button selects all", () => {
    const { getAllByTestId, getByTestId } = render(
      <ChoiceFormContainer
        url={`${process.env.REACT_APP_FIREBASE_TEST_API}/options`}
      />
    );

    const checkbox = getAllByTestId("genre-checkbox")[0];

    expect(checkbox).toHaveStyle("background-color: transparent");

    const allBtn = getByTestId("genre-all-btn");

    fireEvent.click(allBtn);

    expect(checkbox).toHaveStyle("background-color: var(--clr-neon)");
  });

  it("genre all button styling changes on click", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer
        url={`${process.env.REACT_APP_FIREBASE_TEST_API}/options`}
      />
    );

    const allBtn = getByTestId("genre-all-btn");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: #aaa");
  });

  it("displays Decade panel", () => {
    const { getByText } = render(<ChoiceFormContainer />);

    expect(getByText("Runtime")).toBeTruthy();
  });

  it("renders Decade slider with default values", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer decadeData={decadeData} />
    );

    expect(getByTestId("decade-min-val").value).toBe(decadeData.defaultMin);
    expect(getByTestId("decade-max-val").value).toBe(decadeData.defaultMax);
  });

  it("decade all button selects all", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer decadeData={decadeData} />
    );

    expect(getByTestId("decade-min-val").value).toBe(decadeData.defaultMin);
    expect(getByTestId("decade-max-val").value).toBe(decadeData.defaultMax);

    const allBtn = getByTestId("decade-all-btn");

    fireEvent.click(allBtn);

    expect(getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArray[0]
    );
    expect(getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArray.slice(-1)[0]
    );
  });

  it("clicking decade all button second time returns to previous values", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer decadeData={decadeData} />
    );

    expect(getByTestId("decade-min-val").value).toBe(decadeData.defaultMin);
    expect(getByTestId("decade-max-val").value).toBe(decadeData.defaultMax);

    const allBtn = getByTestId("decade-all-btn");

    fireEvent.click(allBtn);

    expect(getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArray[0]
    );
    expect(getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArray.slice(-1)[0]
    );

    fireEvent.click(allBtn);

    expect(getByTestId("decade-min-val").value).toBe(decadeData.defaultMin);
    expect(getByTestId("decade-max-val").value).toBe(decadeData.defaultMax);
  });

  it("decade all button styling changes on click", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer decadeData={decadeData} />
    );

    const allBtn = getByTestId("decade-all-btn");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: #aaa");
  });

  it("displays Runtime panel", () => {
    const { getByText } = render(<ChoiceFormContainer />);

    expect(getByText("Runtime")).toBeTruthy();
  });

  it("renders Runtime slider with default values", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer runtimeData={runtimeData} />
    );

    expect(getByTestId("runtime-min-val").value).toBe(runtimeData.defaultMin);
    expect(getByTestId("runtime-max-val").value).toBe(runtimeData.defaultMax);
  });

  it("Runtime all button selects all", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer runtimeData={runtimeData} />
    );

    expect(getByTestId("runtime-min-val").value).toBe(runtimeData.defaultMin);
    expect(getByTestId("runtime-max-val").value).toBe(runtimeData.defaultMax);

    const allBtn = getByTestId("runtime-all-btn");

    fireEvent.click(allBtn);

    expect(getByTestId("runtime-min-val").value).not.toBe(
      runtimeData.defaultMin
    );
    expect(getByTestId("runtime-max-val").value).not.toBe(
      runtimeData.defaultMax
    );
    expect(getByTestId("runtime-min-val").value).toBe(
      runtimeData.optionsArray[0]
    );
    expect(getByTestId("runtime-max-val").value).toBe(
      runtimeData.optionsArray.slice(-1)[0]
    );
  });

  it("clicking Runtime all button second time returns to previous values", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer runtimeData={runtimeData} />
    );

    expect(getByTestId("runtime-min-val").value).toBe(runtimeData.defaultMin);
    expect(getByTestId("runtime-max-val").value).toBe(runtimeData.defaultMax);

    const allBtn = getByTestId("runtime-all-btn");

    fireEvent.click(allBtn);

    expect(getByTestId("runtime-min-val").value).not.toBe(
      runtimeData.defaultMin
    );
    expect(getByTestId("runtime-max-val").value).not.toBe(
      runtimeData.defaultMax
    );
    expect(getByTestId("runtime-min-val").value).toBe(
      runtimeData.optionsArray[0]
    );
    expect(getByTestId("runtime-max-val").value).toBe(
      runtimeData.optionsArray.slice(-1)[0]
    );

    fireEvent.click(allBtn);

    expect(getByTestId("runtime-min-val").value).toBe(runtimeData.defaultMin);
    expect(getByTestId("runtime-max-val").value).toBe(runtimeData.defaultMax);
  });

  it("Runtime all button styling changes on click", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer runtimeData={runtimeData} />
    );

    const allBtn = getByTestId("runtime-all-btn");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: #aaa");
  });

  it("renders submit buttons", () => {
    const { getByTestId } = render(
      <ChoiceFormContainer
        genreData={genreData}
        decadeData={decadeData}
        runtimeData={runtimeData}
      />
    );

    expect(getByTestId("submit-btns")).toBeTruthy();
  });
});
