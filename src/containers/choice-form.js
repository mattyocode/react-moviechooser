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
          <ChoiceForm.Options></ChoiceForm.Options>
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
