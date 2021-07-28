import React from "react";
import { NavbarContainer } from "../containers/navigation";
import { Headline } from "../components";

export default function Home() {
  return (
    <>
      <NavbarContainer />
      <Headline>
        <Headline.Title>Stop deciding, start watching</Headline.Title>
        <Headline.Subhead>
          Choose from 1000s of acclaimed movies.
          <br />
          Filter by genre, decade, and runtime.
        </Headline.Subhead>
      </Headline>
    </>
  );
}
