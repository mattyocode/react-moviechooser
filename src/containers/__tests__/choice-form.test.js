import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChoiceFormContainer, EXAMPLE_QUERIES } from "../choice-form";
import { server, rest } from "../../mocks/server";
import queryString from "../../utils/query-string";

import homepageData from "../../fixtures/homepage.json";
import testGenreData from "../../mocks/test-data/testGenreData.json";

describe("<ChoiceFormContainer/>", () => {
  const genreData = testGenreData;
  const runtimeData = homepageData.runtime;
  const decadeData = homepageData.decade;
  beforeEach(() => {
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={runtimeData}
        decadeData={decadeData}
        onSubmitHandler={() => {}}
      />
    );
  });

  it("renders <ChoiceFormContainer/>", () => {
    expect(screen.getByTestId("choice-form")).toBeTruthy();
  });

  it("displays genres", () => {
    genreData.forEach((g) => expect(screen.getByText(g.name)).toBeTruthy());
  });

  it("renders with genre checkboxes all unchecked", () => {
    const checkboxes = screen.getAllByTestId("genre-checkbox");

    expect(checkboxes[0]).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
    expect(checkboxes[checkboxes.length - 1]).toHaveStyle(
      "background-color: rgba(0, 0, 0, 0)"
    );
  });

  it("can check genre checkbox", () => {
    const checkbox = screen.getAllByTestId("genre-checkbox")[0];

    expect(checkbox).toHaveStyle("background-color: rgba(0, 0, 0, 0)");

    fireEvent.click(checkbox);

    expect(checkbox).toHaveStyle("background-color: var(--clr-neon)");
  });

  it("genre all button selects all", () => {
    const checkbox = screen.getAllByTestId("genre-checkbox")[0];

    expect(checkbox).toHaveStyle("background-color: rgba(0, 0, 0, 0)");

    const allBtn = screen.getByTestId("genre-all-btn");

    fireEvent.click(allBtn);

    expect(checkbox).toHaveStyle("background-color: var(--clr-neon)");
  });

  it("genre all button styling changes on click", () => {
    const allBtn = screen.getByTestId("genre-all-btn");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: var(--clr-text-muted)");
  });

  it("shows any-genre hint until a genre is chosen", () => {
    expect(screen.getByTestId("genre-hint")).toBeInTheDocument();

    fireEvent.click(screen.getAllByTestId("genre-checkbox")[0]);

    expect(screen.queryByTestId("genre-hint")).not.toBeInTheDocument();
  });

  it("genre all button label reflects what it will do", () => {
    const allBtn = screen.getByTestId("genre-all-btn");
    expect(allBtn).toHaveTextContent("Select all");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveTextContent("Clear");
  });

  // Slider thumbs take step indexes; narrow a slider so "all" has work to do.
  const narrow = (section, min, max) => {
    fireEvent.change(screen.getByTestId(`${section}-thumb-min`), {
      target: { value: min },
    });
    fireEvent.change(screen.getByTestId(`${section}-thumb-max`), {
      target: { value: max },
    });
  };

  it("sliders start at the full range", () => {
    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[0]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull.slice(-1)[0]
    );
    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.optionsArray[0]
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.optionsArray.slice(-1)[0]
    );
  });

  it("slider all buttons read 'Any' at the full range, 'Reset' after widening", () => {
    const decadeBtn = screen.getByTestId("decade-all-btn");
    expect(decadeBtn).toHaveTextContent("Any decade");
    expect(screen.getByTestId("runtime-all-btn")).toHaveTextContent(
      "Any length"
    );

    narrow("decade", 2, 5);
    expect(decadeBtn).toHaveTextContent("Any decade");

    fireEvent.click(decadeBtn);
    expect(decadeBtn).toHaveTextContent("Reset");
  });

  it("genre checkboxes stay keyboard focusable", () => {
    const input = screen.getByRole("checkbox", { name: genreData[0].name });
    expect(input).not.toHaveStyle("display: none");
  });

  it("displays Decade panel", () => {
    expect(screen.getByText("Runtime")).toBeTruthy();
  });

  it("decade all button widens to the full range and restores", () => {
    narrow("decade", 2, 5);
    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[2]
    );

    const allBtn = screen.getByTestId("decade-all-btn");
    fireEvent.click(allBtn);

    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[0]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull.slice(-1)[0]
    );

    fireEvent.click(allBtn);

    expect(screen.getByTestId("decade-min-val").value).toBe(
      decadeData.optionsArrayFull[2]
    );
    expect(screen.getByTestId("decade-max-val").value).toBe(
      decadeData.optionsArrayFull[5]
    );
  });

  it("decade all button is muted at the full range", () => {
    const allBtn = screen.getByTestId("decade-all-btn");
    expect(allBtn).toHaveStyle("color: var(--clr-text-muted)");

    narrow("decade", 2, 5);
    expect(allBtn).not.toHaveStyle("color: var(--clr-text-muted)");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: var(--clr-text-muted)");
  });

  it("displays Runtime panel", () => {
    expect(screen.getByText("Runtime")).toBeTruthy();
  });

  it("Runtime all button widens to the full range and restores", () => {
    narrow("runtime", 1, 4);
    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.optionsArray[1]
    );

    const allBtn = screen.getByTestId("runtime-all-btn");
    fireEvent.click(allBtn);

    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.optionsArray[0]
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.optionsArray.slice(-1)[0]
    );

    fireEvent.click(allBtn);

    expect(screen.getByTestId("runtime-min-val").value).toBe(
      runtimeData.optionsArray[1]
    );
    expect(screen.getByTestId("runtime-max-val").value).toBe(
      runtimeData.optionsArray[4]
    );
  });

  it("Runtime all button is muted at the full range", () => {
    const allBtn = screen.getByTestId("runtime-all-btn");
    narrow("runtime", 1, 4);
    expect(allBtn).not.toHaveStyle("color: var(--clr-text-muted)");

    fireEvent.click(allBtn);
    expect(allBtn).toHaveStyle("color: var(--clr-text-muted)");
  });

  it("renders submit buttons", () => {
    expect(screen.getByTestId("submit-btns")).toBeTruthy();
  });

  it("Submit btn sends the full ranges if no selections made", () => {
    cleanup();
    const mockOnSubmit = vi.fn();
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={runtimeData}
        decadeData={decadeData}
        onSubmitHandler={mockOnSubmit}
      />
    );

    const submitBtn = screen.getByText(/get movies/i);

    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      decade: { max: "2020", min: "pre" },
      genre: [],
      runtime: { max: ">150", min: "<75" },
      text: "",
    });
  });

  it("Submit btn returns selected values", () => {
    cleanup();
    const mockOnSubmit = vi.fn();
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={runtimeData}
        decadeData={decadeData}
        onSubmitHandler={mockOnSubmit}
      />
    );

    const horrorGenre = screen.getByText(/horror/i);
    fireEvent.click(horrorGenre);

    const decadeMinThumb = screen.getByTestId("decade-thumb-min");
    const decadeMaxThumb = screen.getByTestId("decade-thumb-max");

    fireEvent.change(decadeMinThumb, { target: { value: 0 } });
    fireEvent.change(decadeMaxThumb, {
      target: { value: decadeData.optionsArray.length - 1 },
    });

    const runtimeMinThumb = screen.getByTestId("runtime-thumb-min");
    const runtimeMaxThumb = screen.getByTestId("runtime-thumb-max");

    fireEvent.change(runtimeMinThumb, { target: { value: 0 } });
    fireEvent.change(runtimeMaxThumb, {
      target: { value: runtimeData.optionsArray.length - 1 },
    });

    const submitBtn = screen.getByText(/get movies/i);

    fireEvent.click(submitBtn);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      decade: { max: "2020", min: "pre" },
      genre: [11],
      runtime: { max: ">150", min: "<75" },
      text: "",
    });
  });
});

describe("<ChoiceFormContainer/> live count and restored search", () => {
  const genreData = testGenreData;

  it("labels the submit button with the live match count", async () => {
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={homepageData.runtime}
        decadeData={homepageData.decade}
        onSubmitHandler={() => {}}
      />
    );
    expect(await screen.findByText("Show 12 movies")).toBeInTheDocument();
  });

  it("disables submit and explains when nothing matches", async () => {
    const onSubmit = vi.fn();
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={homepageData.runtime}
        decadeData={homepageData.decade}
        onSubmitHandler={onSubmit}
      />
    );
    fireEvent.click(screen.getAllByTestId("genre-checkbox")[0]);

    expect(await screen.findByText("No matches")).toBeInTheDocument();
    expect(screen.getByTestId("no-matches-hint")).toBeInTheDocument();
    expect(screen.getByTestId("all-matches-btn")).toBeDisabled();
  });

  it("restores a previous search", () => {
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={homepageData.runtime}
        decadeData={homepageData.decade}
        onSubmitHandler={() => {}}
        initialQuery={{
          genre: [genreData[1].id],
          decade: { min: "1990", max: "2000" },
          runtime: { min: "90", max: "120" },
        }}
      />
    );
    expect(
      screen.getByRole("checkbox", { name: genreData[1].name })
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: genreData[0].name })
    ).not.toBeChecked();
    expect(screen.getByText("1990s")).toBeInTheDocument();
    expect(screen.getByText("1h 30m")).toBeInTheDocument();
  });
});

describe("<ChoiceFormContainer/> text search", () => {
  const genreData = testGenreData;
  const countUrl = `${import.meta.env.VITE_API}/api/movies/count/`;
  const box = () =>
    screen.getByRole("searchbox", {
      name: "Describe what you're in the mood for",
    });

  const renderForm = (props = {}) => {
    const onSubmit = vi.fn();
    render(
      <ChoiceFormContainer
        genreList={genreData}
        runtimeData={homepageData.runtime}
        decadeData={homepageData.decade}
        onSubmitHandler={onSubmit}
        {...props}
      />
    );
    return onSubmit;
  };

  it("shows the text box above the genre filters", () => {
    renderForm();

    const genreHeading = screen.getByRole("heading", { name: "Genre" });
    expect(
      box().compareDocumentPosition(genreHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("caps the text at 120 characters, even when pasted", () => {
    renderForm();

    expect(box()).toHaveAttribute("maxLength", "120");
    fireEvent.change(box(), { target: { value: "a".repeat(150) } });
    expect(box().value).toHaveLength(120);
  });

  it("shows four example chips and a hint that filters still apply", () => {
    renderForm();

    expect(screen.getAllByTestId("example-chip")).toHaveLength(4);
    expect(screen.getByTestId("text-search-hint")).toHaveTextContent(
      /genre, decade and runtime/
    );
  });

  it("makes the search button the form's default button", () => {
    renderForm();

    // Browsers send Enter to the first submit button in the form; untyped
    // buttons count. jsdom and user-event don't model this, so check it here.
    const form = box().closest("form");
    const defaultButton = form.querySelector(
      'button:not([type]), button[type="submit"], input[type="submit"]'
    );
    expect(defaultButton).toBe(screen.getByTestId("all-matches-btn"));
  });

  it("submits the text and filters when Enter is pressed", () => {
    const onSubmit = renderForm();

    userEvent.type(box(), "i'm hungry{enter}");

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      text: "i'm hungry",
      genre: [],
      decade: { min: "pre", max: "2020" },
    });
  });

  it("sends text alongside a chosen genre", () => {
    const onSubmit = renderForm();

    fireEvent.click(screen.getByText(/horror/i));
    fireEvent.change(box(), { target: { value: "heist" } });
    fireEvent.click(screen.getByTestId("all-matches-btn"));

    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      text: "heist",
      genre: [11],
    });
  });

  it("sends no q for blank text", () => {
    const onSubmit = renderForm();

    fireEvent.change(box(), { target: { value: "   " } });
    fireEvent.click(screen.getByTestId("all-matches-btn"));

    expect(queryString(onSubmit.mock.calls[0][0])).not.toMatch(/q=/);
  });

  it("a chip fills the box and searches at once with the full range", () => {
    const onSubmit = renderForm();

    fireEvent.click(screen.getByText(EXAMPLE_QUERIES[0]));

    expect(box().value).toBe(EXAMPLE_QUERIES[0]);
    expect(onSubmit).toHaveBeenCalledWith({
      text: EXAMPLE_QUERIES[0],
      genre: [],
      decade: { min: "pre", max: "2020" },
      runtime: { min: "<75", max: ">150" },
    });
  });

  it("a chip keeps the filters already set", () => {
    const onSubmit = renderForm();

    fireEvent.click(screen.getByText(/horror/i));
    fireEvent.click(screen.getByText(EXAMPLE_QUERIES[1]));

    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      text: EXAMPLE_QUERIES[1],
      genre: [11],
    });
  });

  it("labels the button with the live count when fewer than 30 match", async () => {
    renderForm();

    fireEvent.change(box(), { target: { value: "heist" } });

    expect(await screen.findByText("Show 12 movies")).toBeInTheDocument();
  });

  it("labels the button 'Show top 30' when 30 or more match", async () => {
    server.use(
      rest.get(countUrl, (req, res, ctx) => res(ctx.json({ count: 412 })))
    );
    renderForm();

    // A genre no other test picks, so the cached count doesn't apply.
    fireEvent.click(screen.getByText(genreData[2].name));
    fireEvent.change(box(), { target: { value: "heist" } });

    expect(await screen.findByText("Show top 30")).toBeInTheDocument();
  });

  it("labels the button 'Find movies' when the count is unavailable", async () => {
    server.use(rest.get(countUrl, (req, res, ctx) => res(ctx.status(500))));
    renderForm();

    fireEvent.click(screen.getByText(genreData[3].name));
    fireEvent.change(box(), { target: { value: "heist" } });

    expect(await screen.findByText("Find movies")).toBeInTheDocument();
  });

  it("refills the box from a previous search", () => {
    renderForm({ initialQuery: { text: "lost in space", genre: [] } });

    expect(box().value).toBe("lost in space");
  });
});
