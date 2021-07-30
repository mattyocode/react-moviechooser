import React from "react";
import { NavbarContainer } from "../containers/navigation";
import { ChoiceForm, Headline } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";

export default function Home() {
  return (
    <>
      <NavbarContainer />
      <Headline>
        <Headline.Title>
          <span>Stop deciding,</span> <span>start watching</span>
        </Headline.Title>
        <Headline.Subhead>
          Choose from 1000s of acclaimed movies.
          <br />
          Filter by genre, decade, and runtime.
        </Headline.Subhead>
      </Headline>
      <ChoiceFormContainer />
    </>
  );
}
