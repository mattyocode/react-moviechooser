import React from "react";
import { ChoiceForm, RangeSlider, Checkboxes } from "../components";
import { useSlider, useCheckbox } from "../hooks";

export function ChoiceFormContainer({
  genreList,
  runtimeData,
  decadeData,
  onSubmitHandler,
}) {
  const {
    isChecked: genreIsChecked,
    checkboxChangeHandler: genreCheckboxChangeHandler,
    allBtnHandler: genreAllBtnHandler,
    allBtnHighlighted: genreAllBtnHighlighted,
  } = useCheckbox(genreList);

  const {
    state: runtimeState,
    setMin: runtimeSetMin,
    setMax: runtimeSetMax,
    allBtnHandler: runtimeAllBtnHandler,
  } = useSlider(
    runtimeData.optionsArray,
    runtimeData.defaultMin,
    runtimeData.defaultMax
  );

  const {
    state: decadeState,
    setMin: decadeSetMin,
    setMax: decadeSetMax,
    allBtnHandler: decadeAllBtnHandler,
  } = useSlider(
    decadeData.optionsArray,
    decadeData.defaultMin,
    decadeData.defaultMax
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    onSubmitHandler({
      genre: genreIsChecked.reduce((acc, cur, idx) => {
        if (cur === true) {
          acc.push(genreList[idx]);
        }
        return acc;
      }, []),
      runtime: {
        min: runtimeState.rangeLabels[runtimeState.minValue],
        max: runtimeState.rangeLabels[runtimeState.maxValue],
      },
      decade: {
        min: decadeState.rangeLabels[decadeState.minValue],
        max: decadeState.rangeLabels[decadeState.maxValue],
      },
    });
  };

  return (
    <ChoiceForm>
      <ChoiceForm.Base onSubmit={formSubmitHandler}>
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
          <Checkboxes
            name="genre"
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
              Select All
            </ChoiceForm.AllButton>
            <h2>Released</h2>
          </ChoiceForm.Heading>
          <RangeSlider
            minValue={decadeState.minValue}
            maxValue={decadeState.maxValue}
            updateMin={decadeSetMin}
            updateMax={decadeSetMax}
            stepValues={decadeState.rangeLabels}
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
              Select All
            </ChoiceForm.AllButton>
            <h2>Runtime</h2>
          </ChoiceForm.Heading>
          <RangeSlider
            minValue={runtimeState.minValue}
            maxValue={runtimeState.maxValue}
            updateMin={runtimeSetMin}
            updateMax={runtimeSetMax}
            stepValues={runtimeState.rangeLabels}
            dataTestId="runtime"
          />
        </ChoiceForm.Panel>
        <ChoiceForm.Panel>
          <ChoiceForm.Submit>
            {/* <ChoiceForm.SubmitBtn>Choose One</ChoiceForm.SubmitBtn> */}
            <ChoiceForm.SubmitBtn data-testid="all-matches-btn">
              All Matches
            </ChoiceForm.SubmitBtn>
          </ChoiceForm.Submit>
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
