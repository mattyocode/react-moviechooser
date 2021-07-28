import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./index";
import { linksData } from "../../fixtures/navData";

// jest.mock("react-router-dom", () => {});

describe("<Navbar /> tests", () => {
  it("renders the <Navbar/> component", async () => {
    const { getByTestId } = render(
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
  });
});

// it("renders the <Navbar/> component", () => {
//   render(<Navbar />);

//   expect(screen.getByTestId("navigation")).not.toBeNull();
// });

// it("renders link to 'all movies'", () => {
//   render(<Navbar />);

//   expect(screen.getByText("Browse All")).not.toBeNull();
// });

// it("toggle button changes visibility in state", () => {
//   render(<Navbar />);

//   expect(screen.getByTestId("toggle-btn")).toBeTruthy();
// });
