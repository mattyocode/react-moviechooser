import React, { useState, useEffect } from "react";
import { ChoiceForm } from "../components/";
import RangeSlider from "../components/ranger-slider";

import homepageData from "../fixtures/homepage.json";

export function ChoiceFormContainer({ genreList = homepageData.genre }) {
  const [isChecked, setIsChecked] = useState(
    new Array(genreList.length).fill(false)
  );
  const [allBtnHighlighted, setAllBtnHighlighted] = useState(true);

  const checkboxChangeHandler = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  const allBtnHandler = (event) => {
    event.preventDefault();
    if (isChecked.includes(false)) {
      setIsChecked(new Array(genreList.length).fill(true));
    } else {
      setIsChecked(new Array(genreList.length).fill(false));
    }
  };

  useEffect(() => {
    if (isChecked.includes(false)) {
      setAllBtnHighlighted(true);
    } else {
      setAllBtnHighlighted(false);
    }
  }, [isChecked]);

  return (
    <ChoiceForm>
      <ChoiceForm.Base>
        <ChoiceForm.Panel>
          <ChoiceForm.Heading>
            <ChoiceForm.AllButton
              data-testid="genre-all-btn"
              onClick={allBtnHandler}
              highlighted={allBtnHighlighted}
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
              data-testid="decade-all-btn"
              onClick={allBtnHandler}
              highlighted={allBtnHighlighted}
            >
              Select All
            </ChoiceForm.AllButton>
            <h2>Decade</h2>
          </ChoiceForm.Heading>
          <RangeSlider />
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
