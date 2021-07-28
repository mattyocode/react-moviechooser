import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./index";
// import { linksData } from "../../fixtures/navData";

// jest.mock("react-router-dom", () => {});

describe("<Navbar /> tests", () => {
  const linksData = [
    {
      id: 1,
      url: "/",
      text: "Browse All",
      highlight: false,
    },
  ];

  it("renders the <Navbar/> component", () => {
    const { container, getByTestId, getByText } = render(
      <Router>
        <Navbar>
          <Navbar.Header>
            <Navbar.Logo to="#" src="../../logo.png" alt="Movie Chooser" />
            <Navbar.ToggleBtn isOpen={false} togglefn={() => {}} />
          </Navbar.Header>
          <Navbar.Links linksData={linksData} showLinks={false} />
        </Navbar>
      </Router>
    );
    expect(getByTestId("navigation")).toBeTruthy();
    expect(getByTestId("toggle-btn")).toBeTruthy();
    expect(getByText("browse all", { exact: false })).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
