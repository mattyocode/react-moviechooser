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
            <li>
              <ChoiceForm.Input id="1" value="Comedy" />
              <ChoiceForm.Label htmlFor="1">Comedy</ChoiceForm.Label>
            </li>
          </ChoiceForm.Options>
        </ChoiceForm.Panel>
      </ChoiceForm.Base>
    </ChoiceForm>
  );
}
