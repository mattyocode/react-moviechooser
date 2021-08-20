import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

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
              released={"1992-11-08"}
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

    expect(screen.getByTestId("card")).toBeTruthy();
    expect(screen.getByText(/revenge of the test/i)).toBeInTheDocument();
    expect(screen.getByText(/1992/i)).toBeInTheDocument();
    expect(screen.getByText(/1h 50m/i)).toBeInTheDocument();
    expect(screen.getByText(/anne actor, telly starr/i)).not.toBeVisible();
    expect(screen.getByText(/ack shunn/i)).not.toBeVisible();
    expect(screen.getByText(/uk/i)).not.toBeVisible();
    expect(screen.getByText(/borror/i)).toBeInTheDocument();
    expect(screen.getByText(/badventure/i)).toBeInTheDocument();

    expect(screen.getByText(/testRating/i)).not.toBeVisible();
    expect(screen.getByText(/testTomatoes/i)).not.toBeVisible();
  });

  it("opens and closes when clicked", () => {
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
              released={"1992-11-08"}
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

    expect(screen.getByText(/anne actor, telly starr/i)).not.toBeVisible();
    expect(screen.getByText(/ack shunn/i)).not.toBeVisible();
    expect(screen.getByText(/uk/i)).not.toBeVisible();

    expect(screen.getByText(/testRating/i)).not.toBeVisible();
    expect(screen.getByText(/testTomatoes/i)).not.toBeVisible();

    const card = screen.getByTestId("content");
    fireEvent.click(card);

    expect(screen.getByText(/anne actor, telly starr/i)).toBeVisible();
    expect(screen.getByText(/ack shunn/i)).toBeVisible();
    expect(screen.getByText(/uk/i)).toBeVisible();

    expect(screen.getByText(/testRating/i)).toBeVisible();
    expect(screen.getByText(/testTomatoes/i)).toBeVisible();

    fireEvent.click(card);

    expect(screen.getByText(/anne actor, telly starr/i)).not.toBeVisible();
    expect(screen.getByText(/ack shunn/i)).not.toBeVisible();
    expect(screen.getByText(/uk/i)).not.toBeVisible();

    expect(screen.getByText(/testRating/i)).not.toBeVisible();
    expect(screen.getByText(/testTomatoes/i)).not.toBeVisible();
  });
});
