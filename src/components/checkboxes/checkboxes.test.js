import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";

import Checkboxes from "./index";

describe("<Checkboxes />", () => {
  it("renders <Checkboxes />", () => {
    render(
      <Checkboxes
        section="test"
        valuesList={["one", "two", "three"]}
        isChecked={[false, false, false]}
      />
    );

    expect(screen.getByTestId("test-checkboxes")).toBeTruthy();
  });

  it("clicking checkbox calls changeHandler with index value", () => {
    const mockChangeHandler = jest.fn();
    render(
      <Checkboxes
        section="test"
        valuesList={["one", "two", "three"]}
        isChecked={[false, false, false]}
        changeHandler={mockChangeHandler}
      />
    );
    const checkboxOne = screen.getAllByTestId("test-checkbox")[2];
    fireEvent.click(checkboxOne);
    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockChangeHandler).toHaveBeenCalledWith(2);
  });

  it("checkbox style is highlighed if isChecked = true", () => {
    render(
      <Checkboxes
        section="test"
        valuesList={["one", "two"]}
        isChecked={[false, true]}
      />
    );

    const checkboxOne = screen.getAllByTestId("test-checkbox")[0];
    const checkboxTwo = screen.getAllByTestId("test-checkbox")[1];

    expect(checkboxOne).toHaveStyle("background-color: transparent");
    expect(checkboxTwo).toHaveStyle("background-color: var(--clr-neon)");
  });
});
