import React from "react";
import { ChoiceForm, RangeSlider, Checkboxes } from "../components";
import { useSlider, useCheckbox, useResultCount } from "../hooks";
import { motion } from "framer-motion";

import { sliderDefaults } from "../utils/filters";
import queryString from "../utils/query-string";

const submitLabel = (count) => {
  if (count === null) return "Get Movies";
  if (count === 0) return "No matches";
  return `Show ${count} ${count === 1 ? "movie" : "movies"}`;
};

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

  const query = {
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
  const resultCount = useResultCount(queryString(query));

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (resultCount === 0) return;
    onSubmitHandler(query);
  };

  return (
    <ChoiceForm id="filters">
      <ChoiceForm.Base onSubmit={formSubmitHandler}>
        <ChoiceForm.Filters>
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
                {decadeState.allSelected ? "Reset" : "Any decade"}
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
                {runtimeState.allSelected ? "Reset" : "Any length"}
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
              data-testid="all-matches-btn"
              as={motion.button}
              whileHover={resultCount === 0 ? undefined : { scale: 1.04 }}
              whileTap={resultCount === 0 ? undefined : { scale: 0.98 }}
              disabled={resultCount === 0}
              aria-live="polite"
            >
              {submitLabel(resultCount)}
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
