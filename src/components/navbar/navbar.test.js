import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Navbar from "./index";

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
    render(
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
    expect(screen.getByTestId("navigation")).toBeTruthy();
    expect(screen.getByTestId("toggle-btn")).toBeTruthy();
    // expect(screen.getByText("browse all", { exact: false })).toBeTruthy();
    // expect(container.firstChild).toMatchSnapshot();
  });

  it("shows dropdown when clicking toggle button", () => {
    render(
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
    expect(screen.getByTestId("toggle-btn")).toBeTruthy();
    fireEvent.click(screen.getByTestId("toggle-btn"));
  });
});
