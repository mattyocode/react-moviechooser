import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import CardActions from "./index";

describe("<CardActions/> component tests", () => {
  it("renders <CardActions/> with test data", () => {
    render(
      <CardActions>
        <CardActions.Header>Title</CardActions.Header>
        <CardActions.Body>
          <CardActions.Image />
          <CardActions.Links>
            <CardActions.Link>Test Link</CardActions.Link>
          </CardActions.Links>
        </CardActions.Body>
      </CardActions>
    );
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/test link/i)).toBeInTheDocument();
  });
});
