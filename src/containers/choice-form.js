import React from "react";
import { ChoiceForm } from "../components/";

export function ChoiceFormContainer({ genreList }) {
  return (
    <ChoiceForm>
      <ChoiceForm.Base>
        <ChoiceForm.Panel>
          <ChoiceForm.Title>Genre</ChoiceForm.Title>
          <ChoiceForm.AllButton>Select All</ChoiceForm.AllButton>
          <ChoiceForm.Options>
            {genreList.map((genre, index) => {
              return (
                // <li key={index}>
                //   <ChoiceForm.Label htmlFor={index}>
                //     <ChoiceForm.Input id={index} value={genre} checked={true} />
                //     {genre}
                //   </ChoiceForm.Label>
                // </li>
                <ChoiceForm.Checkbox
                  name={genre}
                  index={index}
                  //   checkedState={checkedState[index]}
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
