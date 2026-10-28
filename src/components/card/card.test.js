import React from "react";
import { render, screen } from "@testing-library/react";

import Card from "./index";

describe("<Card />", () => {
  const reviews = [
    { id: 1, source: "testRating", score: 89 },
    { id: 2, source: "testTomatoes", score: 67 },
  ];
  it("renders <Card /> component", () => {
    render(
      <Card>
        <Card.Content>
          <Card.Sidebar>
            <Card.AvgRating>55</Card.AvgRating>
            <Card.Image src={"/"} />
            <Card.AllRatings ratings={reviews} />
          </Card.Sidebar>
          <Card.Main>
            <Card.Header
              title={"Revenge of the Test"}
              released={"1992-11-08"}
              runtime={"1h 50m"}
              plot={"Once upon a time..."}
            />
            <Card.FurtherInfo
              starring={"Anne Actor, Telly Starr"}
              director={"Ack Shunn"}
              country={"UK"}
            />
            <Card.Genres
              genres={[
                { id: 3, name: "Borror" },
                { id: 5, name: "Badventure" },
              ]}
            />
          </Card.Main>
          <Card.Footer />
        </Card.Content>
      </Card>
    );
    // screen.debug();

    expect(screen.getByTestId("card-content")).toBeTruthy();
    expect(screen.getByText(/revenge of the test/i)).toBeInTheDocument();
    expect(screen.getByText(/1992/i)).toBeInTheDocument();
    expect(screen.getByText(/1h 50m/i)).toBeInTheDocument();
    expect(screen.getByText(/anne actor, telly starr/i)).toBeVisible();
    expect(screen.getByText(/ack shunn/i)).toBeVisible();
    expect(screen.getByText(/uk/i)).toBeVisible();
    expect(screen.getByText(/borror/i)).toBeInTheDocument();
    expect(screen.getByText(/badventure/i)).toBeInTheDocument();

    expect(screen.getByText(/testRating/i)).toBeVisible();
    expect(screen.getByText(/testTomatoes/i)).toBeVisible();
  });
});
