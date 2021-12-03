import React from "react";
import { ChoiceForm, RangeSlider, Checkboxes } from "../components";
import { useSlider, useCheckbox } from "../hooks";
import { motion } from "framer-motion";

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
            labelValues={runtimeData.optionsArrayFull}
            dataTestId="runtime"
          />
        </ChoiceForm.Panel>
        <ChoiceForm.Panel>
          <ChoiceForm.Submit>
            <ChoiceForm.SubmitBtn
              data-testid="all-matches-btn"
              as={motion.button}
              whileHover={{ scale: 1.1 }}
            >
              Get Movies
            </ChoiceForm.SubmitBtn>
          </ChoiceForm.Submit>
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
