import React, { useState } from "react";
import { ChoiceForm, RangeSlider, Checkboxes } from "../components";
import { useSlider, useCheckbox, useResultCount } from "../hooks";
import { motion } from "framer-motion";

import { sliderDefaults } from "../utils/filters";
import queryString from "../utils/query-string";

// Matches the API: text search ranks at most this many, on one page.
const TEXT_SEARCH_LIMIT = 30;
const TEXT_SEARCH_MAX_CHARS = 120;

// Queries whose words turn up in plots, so they work on raw text search.
export const EXAMPLE_QUERIES = [
  "I'm hungry",
  "A twisty heist",
  "Lost in space",
  "Haunted house",
];

const submitLabel = (count, hasText) => {
  if (count === null) return hasText ? "Find movies" : "Get Movies";
  if (count === 0) return "No matches";
  if (hasText && count >= TEXT_SEARCH_LIMIT) {
    return `Show top ${TEXT_SEARCH_LIMIT}`;
  }
  return `Show ${count} ${count === 1 ? "movie" : "movies"}`;
};

// "Reset" only when the full range replaced a narrower one it can restore;
// a slider that starts at the full range just reads as "Any …".
const allButtonLabel = (sliderState, anyLabel) =>
  sliderState.allSelected && sliderState.prevMin !== null ? "Reset" : anyLabel;

export function ChoiceFormContainer({
  genreList,
  runtimeData,
  decadeData,
  onSubmitHandler,
  initialQuery,
}) {
  const runtimeDefaults = sliderDefaults(
    runtimeData,
    initialQuery && initialQuery.runtime
  );
  const decadeDefaults = sliderDefaults(
    decadeData,
    initialQuery && initialQuery.decade
  );

  const {
    isChecked: genreIsChecked,
    checkboxChangeHandler: genreCheckboxChangeHandler,
    allBtnHandler: genreAllBtnHandler,
    allBtnHighlighted: genreAllBtnHighlighted,
  } = useCheckbox(genreList, (initialQuery && initialQuery.genre) || []);

  const {
    state: runtimeState,
    setMin: runtimeSetMin,
    setMax: runtimeSetMax,
    allBtnHandler: runtimeAllBtnHandler,
  } = useSlider(
    runtimeData.optionsArray,
    runtimeDefaults.min,
    runtimeDefaults.max
  );

  const {
    state: decadeState,
    setMin: decadeSetMin,
    setMax: decadeSetMax,
    allBtnHandler: decadeAllBtnHandler,
  } = useSlider(
    decadeData.optionsArray,
    decadeDefaults.min,
    decadeDefaults.max
  );

  const [text, setText] = useState((initialQuery && initialQuery.text) || "");
  const hasText = text.trim() !== "";

  const filterQuery = {
    genre: genreIsChecked.reduce((acc, cur, idx) => {
      if (cur === true && genreList[idx]) {
        acc.push(genreList[idx].id);
      }
      return acc;
    }, []),
    runtime: {
      min: runtimeData.queryArray[runtimeState.minValue],
      max: runtimeData.queryArray[runtimeState.maxValue],
    },
    decade: {
      min: decadeData.queryArray[decadeState.minValue],
      max: decadeData.queryArray[decadeState.maxValue],
    },
  };
  // The live count ignores the text: it's how many movies text search ranks.
  const resultCount = useResultCount(queryString(filterQuery));

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (resultCount === 0) return;
    onSubmitHandler({ ...filterQuery, text: text.trim() });
  };

  // Chips search straight away, even with zero matches: the results page's
  // empty state explains it, where a dead click wouldn't.
  const exampleClickHandler = (example) => {
    setText(example);
    onSubmitHandler({ ...filterQuery, text: example });
  };

  return (
    <ChoiceForm id="filters">
      <ChoiceForm.Base onSubmit={formSubmitHandler}>
        <ChoiceForm.Filters>
          <ChoiceForm.TextSearch
            value={text}
            onChange={setText}
            maxLength={TEXT_SEARCH_MAX_CHARS}
            examples={EXAMPLE_QUERIES}
            onExampleClick={exampleClickHandler}
          />
          <ChoiceForm.Panel>
            <ChoiceForm.Heading>
              <ChoiceForm.AllButton
                data-testid="genre-all-btn"
                onClick={genreAllBtnHandler}
                highlighted={genreAllBtnHighlighted}
              >
                {genreAllBtnHighlighted ? "Select all" : "Clear"}
              </ChoiceForm.AllButton>
              <h2>Genre</h2>
              {!genreIsChecked.includes(true) && (
                <ChoiceForm.Hint data-testid="genre-hint">
                  No genre selected means any genre
                </ChoiceForm.Hint>
              )}
            </ChoiceForm.Heading>
            <Checkboxes
              section="genre"
              valuesList={genreList}
              isChecked={genreIsChecked}
              changeHandler={genreCheckboxChangeHandler}
            />
          </ChoiceForm.Panel>

          <ChoiceForm.Panel>
            <ChoiceForm.Heading>
              <ChoiceForm.AllButton
                data-testid="decade-all-btn"
                onClick={decadeAllBtnHandler}
                highlighted={!decadeState.allSelected}
              >
                {allButtonLabel(decadeState, "Any decade")}
              </ChoiceForm.AllButton>
              <h2>Released</h2>
            </ChoiceForm.Heading>
            <RangeSlider
              minValue={decadeState.minValue}
              maxValue={decadeState.maxValue}
              updateMin={decadeSetMin}
              updateMax={decadeSetMax}
              stepValues={decadeState.rangeLabels}
              labelValues={decadeData.optionsArrayFull}
              dataTestId="decade"
            />
          </ChoiceForm.Panel>

          <ChoiceForm.Panel>
            <ChoiceForm.Heading>
              <ChoiceForm.AllButton
                data-testid="runtime-all-btn"
                onClick={runtimeAllBtnHandler}
                highlighted={!runtimeState.allSelected}
              >
                {allButtonLabel(runtimeState, "Any length")}
              </ChoiceForm.AllButton>
              <h2>Runtime</h2>
            </ChoiceForm.Heading>
            <RangeSlider
              minValue={runtimeState.minValue}
              maxValue={runtimeState.maxValue}
              updateMin={runtimeSetMin}
              updateMax={runtimeSetMax}
              stepValues={runtimeState.rangeLabels}
              labelValues={runtimeData.optionsArrayFull}
              dataTestId="runtime"
            />
          </ChoiceForm.Panel>
        </ChoiceForm.Filters>
        <ChoiceForm.SubmitPanel>
          <ChoiceForm.Submit>
            <ChoiceForm.SubmitBtn
              type="submit"
              data-testid="all-matches-btn"
              as={motion.button}
              whileHover={resultCount === 0 ? undefined : { scale: 1.04 }}
              whileTap={resultCount === 0 ? undefined : { scale: 0.98 }}
              disabled={resultCount === 0}
              aria-live="polite"
            >
              {submitLabel(resultCount, hasText)}
            </ChoiceForm.SubmitBtn>
          </ChoiceForm.Submit>
          {resultCount === 0 && (
            <ChoiceForm.Hint data-testid="no-matches-hint">
              Try fewer genres, or widen the decade or runtime range.
            </ChoiceForm.Hint>
          )}
        </ChoiceForm.SubmitPanel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
