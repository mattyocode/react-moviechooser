import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Card from "./index";

describe("<Card />", () => {
  it("renders <Card /> component", () => {
    render(
      <Card>
        Movie Title
        {/* <Card.Content>
          <Card.Sidebar>
            <Card.AvgRating>89.9</Card.AvgRating>
            <Card.Image />
            <Card.AllRatings ratings={[]} />
          </Card.Sidebar>
          <Card.Main>
            <Card.Header title={"Movie Title"} year={1992} runtime={"1h 50m"} />
          </Card.Main>
        </Card.Content> */}
      </Card>
    );
  });
  screen.debug();

  expect(screen.getByText(/movie title/i)).toBeInTheDocument();
});
