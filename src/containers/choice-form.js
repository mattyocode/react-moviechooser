import React from "react";
import { ChoiceForm } from "../components/";
import RangeSlider from "../components/ranger-slider";
import { useSlider, useCheckbox } from "../hooks";

export function ChoiceFormContainer({ genreList, runtimeData, decadeData }) {
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

  const {
    minValue: decadeMinValue,
    setMinValue: decadeSetMinValue,
    maxValue: decadeMaxValue,
    setMaxValue: decadeSetMaxValue,
    allBtnHighlighted: decadeAllBtnHighlighted,
    allBtnHandler: decadeAllBtnHandler,
  } = useSlider(
    decadeData.optionsArray,
    decadeData.defaultMin,
    decadeData.defaultMax
  );

  console.log("in choice form values", runtimeMinValue, runtimeMaxValue);

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
            {genreList
              ? genreList.map((genre, index) => {
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
                })
              : null}
          </ChoiceForm.Options>
        </ChoiceForm.Panel>

        <ChoiceForm.Panel>
          <ChoiceForm.Heading>
            <ChoiceForm.AllButton
              data-testid="decade-all-btn"
              onClick={decadeAllBtnHandler}
              highlighted={decadeAllBtnHighlighted}
            >
              Select All
            </ChoiceForm.AllButton>
            <h2>Released</h2>
          </ChoiceForm.Heading>
          <RangeSlider
            minValue={decadeMinValue}
            maxValue={decadeMaxValue}
            updateMin={decadeSetMinValue}
            updateMax={decadeSetMaxValue}
            stepValues={decadeData.optionsArray}
            dataTestId="decade"
          />
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
        <ChoiceForm.Panel>
          <ChoiceForm.Submit>
            <ChoiceForm.SubmitBtn>Choose One</ChoiceForm.SubmitBtn>
            <ChoiceForm.SubmitBtn>All Matches</ChoiceForm.SubmitBtn>
          </ChoiceForm.Submit>
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
