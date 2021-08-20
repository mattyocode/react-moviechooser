import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Card from "./index";

describe("<Card />", () => {
  it("renders <Card /> component", () => {
    const ratings = [{ testRating: 89 }, { testTomatoes: 67 }];
    render(
      <Card>
        <Card.Content>
          <Card.Sidebar>
            <Card.AvgRating>55</Card.AvgRating>
            <Card.Image src={"/"} />
            <Card.AllRatings ratings={ratings} />
          </Card.Sidebar>
          <Card.Main>
            <Card.Header
              title={"Revenge of the Test"}
              year={"1992-11-08"}
              runtime={"1h 50m"}
              plot={"Once upon a time..."}
            />
            <Card.FurtherInfo
              starring={["Anne Actor", "Telly Starr"]}
              director={["Ack Shunn"]}
              country={"UK"}
            />
            <Card.Genres genres={["Borror", "Badventure"]} />
          </Card.Main>
          <Card.Footer />
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

    expect(screen.getByText(/testRating/i)).toBeInTheDocument();
    expect(screen.getByText(/89/i)).toBeInTheDocument();
  });
});
