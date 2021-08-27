import React from "react";
// import { useSelector } from "react-redux";

import { CardContainer } from "../containers/card";
import { Headline } from "../components";
import moviesData from "../fixtures/moviesDataFromStore.json";

export default function Movies() {
  // const movies = useSelector((state) => state.movies.movies);

  return (
    <>
      <Headline>
        <Headline.Title>Results</Headline.Title>
        {/* <Headline.Subhead>
          Choose from 1000s of acclaimed movies.
          <br />
          Filter by genre, decade, and runtime.
        </Headline.Subhead> */}
      </Headline>
      <CardContainer moviesData={moviesData} />
    </>
  );
}
