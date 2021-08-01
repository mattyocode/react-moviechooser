import React, { useState } from "react";
import { ChoiceForm } from "../components/";

export function ChoiceFormContainer({ genreList }) {
  const [isChecked, setIsChecked] = useState(
    new Array(genreList.length).fill(false)
  );

  //   const checkboxChangeHandler = (position) => {
  //     const updatedCheckedState = isChecked.map((item, index) => {
  //       if (position === index) {
  //         return !item;
  //       } else {
  //         return item;
  //       }
  //     });
  //   };
  //   setIsChecked(updatedCheckedState);

  const checkboxChangeHandler = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
    console.log(updatedCheckedState);
  };

  return (
    <ChoiceForm>
      <ChoiceForm.Base>
        <ChoiceForm.Panel>
          <ChoiceForm.Title>Genre</ChoiceForm.Title>
          <ChoiceForm.AllButton>Select All</ChoiceForm.AllButton>
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
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
