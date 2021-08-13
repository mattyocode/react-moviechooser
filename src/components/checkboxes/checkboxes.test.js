import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Checkboxes from "./index";

describe("<Checkboxes />", () => {
  it("renders <Checkboxes />", () => {
    render(
      <Checkboxes
        name="test"
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
        name="test"
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

  it("clicking checkbox calls changeHandler", () => {
    const mockChangeHandler = jest.fn();
    render(
      <Checkboxes
        name="test"
        valuesList={["one", "two", "three"]}
        isChecked={[false, false, false]}
        changeHandler={mockChangeHandler}
      />
    );
    const checkboxOne = screen.getAllByTestId("test-checkbox")[0];
    fireEvent.click(checkboxOne);
    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
  });
});
