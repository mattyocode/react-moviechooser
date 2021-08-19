import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Card from "./index";

describe("<Card />", () => {
  it("renders <Card /> component", () => {
    render(
      <Card>
        <Card.Content>
          <Card.Sidebar>
            <Card.AvgRating>89.9</Card.AvgRating>
            <Card.Image />
            <Card.AllRatings ratings={[]} />
          </Card.Sidebar>
          <Card.Main>
            <Card.Header
              title={"Revenge of the Test"}
              year={1992}
              runtime={"1h 50m"}
            />
            <Card.FurtherInfo
              starring={["Anne Actor", "Telly Starr"]}
              director={["Ack Shunn"]}
              country={"UK"}
            />
            <Card.Genres genres={["Borror", "Badventure"]} />
          </Card.Main>
        </Card.Content>
      </Card>
    );
    screen.debug();
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText(/revenge of the test/i)).toBeInTheDocument();
    expect(screen.getByText(/1992/i)).toBeInTheDocument();
    expect(screen.getByText(/1h 50m/i)).toBeInTheDocument();
    expect(screen.getByText(/anne actor, telly starr/i)).toBeInTheDocument();
    expect(screen.getByText(/ack shunn/i)).toBeInTheDocument();
    expect(screen.getByText(/uk/i)).toBeInTheDocument();
    expect(screen.getByText(/borror/i)).toBeInTheDocument();
    expect(screen.getByText(/badventure/i)).toBeInTheDocument();
  });
});
