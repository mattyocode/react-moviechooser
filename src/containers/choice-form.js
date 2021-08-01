import React, { useState } from "react";
import { ChoiceForm } from "../components/";

export function ChoiceFormContainer({ genreList }) {
  const [isChecked, setIsChecked] = useState(
    new Array(genreList.length).fill(true)
  );

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
                  name={genre}
                  index={index}
                  checkedState={true}
                  //   changeHandler={checkboxChangeHandler}
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
