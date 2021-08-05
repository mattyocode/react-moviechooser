import React, { useState, useEffect } from "react";
import { ChoiceForm } from "../components/";
import RangeSlider from "../components/ranger-slider";
import { useSlider, useCheckbox } from "../hooks";

import homepageData from "../fixtures/homepage.json";

export function ChoiceFormContainer({
  genreList = homepageData.genre,
  runtimeData = homepageData.runtime,
  decadeData = homepageData.decadeData,
}) {
  const {
    isChecked: genreIsChecked,
    checkboxChangeHandler: genreCheckboxChangeHandler,
    allBtnHandler: genreAllBtnHandler,
    allBtnHighlighted: genreAllBtnHighlighted,
  } = useCheckbox(genreList);

  const {
    minValue: runtimeMinValue,
    setMinValue: runtimeSetMinValue,
    maxValue: runtimeMaxValue,
    setMaxValue: runtimeSetMaxValue,
    allBtnHighlighted: runtimeAllBtnHighlighted,
    allBtnHandler: runtimeAllBtnHandler,
  } = useSlider(
    runtimeData.optionsArray,
    runtimeData.defaultMin,
    runtimeData.defaultMax
  );

  return (
    <ChoiceForm>
      <ChoiceForm.Base>
        <ChoiceForm.Panel>
          <ChoiceForm.Heading>
            <ChoiceForm.AllButton
              data-testid="genre-all-btn"
              onClick={genreAllBtnHandler}
              highlighted={genreAllBtnHighlighted}
            >
              Select All
            </ChoiceForm.AllButton>
            <h2>Genre</h2>
          </ChoiceForm.Heading>

          <ChoiceForm.Options>
            {genreList.map((genre, index) => {
              return (
                <ChoiceForm.Checkbox
                  key={index}
                  name={genre}
                  index={index}
                  checkedState={genreIsChecked[index]}
                  changeHandler={genreCheckboxChangeHandler}
                >
                  {genre}
                </ChoiceForm.Checkbox>
              );
            })}
          </ChoiceForm.Options>
        </ChoiceForm.Panel>
        <ChoiceForm.Panel>
          <ChoiceForm.Heading>
            <ChoiceForm.AllButton
              data-testid="runtime-all-btn"
              onClick={runtimeAllBtnHandler}
              highlighted={runtimeAllBtnHighlighted}
            >
              Select All
            </ChoiceForm.AllButton>
            <h2>Runtime</h2>
          </ChoiceForm.Heading>
          <RangeSlider
            minValue={runtimeMinValue}
            maxValue={runtimeMaxValue}
            updateMin={runtimeSetMinValue}
            updateMax={runtimeSetMaxValue}
            stepValues={runtimeData.optionsArray}
            dataTestId="runtime"
          />
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
