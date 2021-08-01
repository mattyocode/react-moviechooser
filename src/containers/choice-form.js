import React from "react";
import { ChoiceForm } from "../components/";

export function ChoiceFormContainer({
  genreList,
  decadeList,
  minRuntime,
  maxRuntime,
}) {
  return (
    <ChoiceForm>
      <ChoiceForm.Base>
        <ChoiceForm.Panel>
          <ChoiceForm.Title>Genre</ChoiceForm.Title>
          <ChoiceForm.AllButton>Select All</ChoiceForm.AllButton>
          <ChoiceForm.Options>
            {genreList.map((genre, index) => {
              return (
                <li key={index}>
                  <ChoiceForm.Input id={index} value={genre} />
                  <ChoiceForm.Label htmlFor={index}>{genre}</ChoiceForm.Label>
                </li>
              );
            })}
          </ChoiceForm.Options>
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
