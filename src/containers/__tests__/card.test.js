import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
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
    expect(screen.getByText(/parasite/i)).toBeTruthy();
  });

  it("launches ondemand modal on click", () => {
    const ondemandBtn = screen.getByTestId(/parasite-ondemand/i);

    singleMovie.ondemand.forEach((o) =>
      expect(screen.queryByText(o.service)).toBeFalsy()
    );

    fireEvent.click(ondemandBtn);

    singleMovie.ondemand.forEach((o) =>
      expect(screen.getByText(o.service)).toBeTruthy()
    );
  });

  it("closes ondemand modal on click", async () => {
    const ondemandBtn = screen.getByTestId(/parasite-ondemand/i);
    fireEvent.click(ondemandBtn);

    await waitFor(() => {
      singleMovie.ondemand.forEach((o) =>
        expect(screen.getByText(o.service)).toBeTruthy()
      );
    });

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);

    await waitFor(() => {
      singleMovie.ondemand.forEach((o) =>
        expect(screen.queryByText(o.service)).toBeFalsy()
      );
    });
  });

  it("launches share modal on click", async () => {
    const shareBtn = screen.getByTestId(/parasite-share/i);

    const SHARE_LIST = ["Email", "Telegram", "Whatsapp", "Facebook", "Twitter"];

    SHARE_LIST.forEach((share) =>
      expect(screen.queryByText(share)).toBeFalsy()
    );

    act(() => {
      fireEvent.click(shareBtn);
    });

    await waitFor(() => {
      SHARE_LIST.forEach((share) =>
        expect(screen.getByText(share)).toBeTruthy()
      );
    });
  });

  it("closes share modal on click", async () => {
    const SHARE_LIST = ["Email", "Telegram", "Whatsapp", "Facebook", "Twitter"];

    const shareBtn = screen.getByTestId(/parasite-share/i);
    act(() => {
      fireEvent.click(shareBtn);
    });

    await waitFor(() => {
      SHARE_LIST.forEach((share) =>
        expect(screen.queryByText(share)).toBeTruthy()
      );
    });

    const backdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(backdrop);

    await waitFor(() => {
      SHARE_LIST.forEach((share) =>
        expect(screen.queryByText(share)).toBeFalsy()
      );
    });
  });
});
