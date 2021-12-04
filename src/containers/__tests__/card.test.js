import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as reactRedux from "react-redux";
import { CardContainer } from "../../containers/card";
import store from "../../store/index";
import testMoviesData from "../../mocks/test-data/testMoviesData.json";

describe("<CardContainer/> tests", () => {
  const singleMovie = testMoviesData[0];
  beforeEach(() => {
    render(
      <reactRedux.Provider store={store}>
        <CardContainer movie={singleMovie} />
      </reactRedux.Provider>
    );
  });
  it("renders <CardContainer/> with single movie", () => {
    expect(screen.getByText(/parasite/i)).toBeInTheDocument();
  });

  it("launches ondemand modal on click", () => {
    const ondemandBtn = screen.getByTestId(/parasite-ondemand/i);

    singleMovie.ondemand.forEach((o) =>
      expect(screen.queryByText(o.service)).not.toBeInTheDocument()
    );

    fireEvent.click(ondemandBtn);

    singleMovie.ondemand.forEach((o) =>
      expect(screen.getByText(o.service)).toBeInTheDocument()
    );
  });

  it("closes ondemand modal on click", async () => {
    const ondemandBtn = screen.getByTestId(/parasite-ondemand/i);
    fireEvent.click(ondemandBtn);

    await waitFor(() => {
      singleMovie.ondemand.forEach((o) =>
        expect(screen.getByText(o.service)).toBeInTheDocument()
      );
    });

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);

    await waitFor(() => {
      singleMovie.ondemand.forEach((o) =>
        expect(screen.queryByText(o.service)).not.toBeInTheDocument()
      );
    });
  });
});
