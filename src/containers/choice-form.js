import React, { useState, useEffect } from "react";
import { ChoiceForm } from "../components/";
import RangeSlider from "../components/ranger-slider";

import homepageData from "../fixtures/homepage.json";

export function ChoiceFormContainer({
  genreList = homepageData.genre,
  runtimeData = homepageData.runtime,
}) {
  const [isChecked, setIsChecked] = useState(
    new Array(genreList.length).fill(false)
  );
  const [allGenreBtnHighlighted, setAllGenreBtnHighlighted] = useState(true);

  const checkboxChangeHandler = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  const allGenreBtnHandler = (event) => {
    event.preventDefault();
    if (isChecked.includes(false)) {
      setIsChecked(new Array(genreList.length).fill(true));
    } else {
      setIsChecked(new Array(genreList.length).fill(false));
    }
  };

  useEffect(() => {
    if (isChecked.includes(false)) {
      setAllGenreBtnHighlighted(true);
    } else {
      setAllGenreBtnHighlighted(false);
    }
  }, [isChecked]);

  const rangeChangeHandler = ({ min, max }) => {};

  return (
    <ChoiceForm>
      <ChoiceForm.Base>
        <ChoiceForm.Panel>
          <ChoiceForm.Heading>
            <ChoiceForm.AllButton
              data-testid="genre-all-btn"
              onClick={allGenreBtnHandler}
              highlighted={allGenreBtnHighlighted}
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
                  checkedState={isChecked[index]}
                  changeHandler={checkboxChangeHandler}
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
              // onClick={allRuntimeBtnHandler}
            >
              Select All
            </ChoiceForm.AllButton>
            <h2>Runtime</h2>
          </ChoiceForm.Heading>
          <RangeSlider
            stepValues={runtimeData.optionsArray}
            defaultMin={runtimeData.defaultMin}
            defaultMax={runtimeData.defaultMax}
            onChange={rangeChangeHandler}
            dataTestId="runtime"
          />
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
