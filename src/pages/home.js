import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Headline, Loading } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";
import { fetchOptions } from "../store/query-slice";
import { fetchMovies, setMovieQuery } from "../store/movies-slice";

import homepageData from "../fixtures/homepage.json";

export default function Home() {
  const genres = useSelector((state) => state.options.options);
  const optionsStatus = useSelector((state) => state.options.status);
  const optionsError = useSelector((state) => state.options.error);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  const getQueryResults = (selectionObj) => {
    dispatch(setMovieQuery(selectionObj));
    dispatch(fetchMovies(selectionObj));
    // redirect to results page.
    history.push("/movies");
  };

  let choiceForm;
  if (optionsStatus === "succeeded") {
    choiceForm = (
      <ChoiceFormContainer
        genreList={genres}
        runtimeData={homepageData.runtime}
        decadeData={homepageData.decade}
        onSubmitHandler={getQueryResults}
      />
    );
  }
  if (optionsStatus === "loading") {
    choiceForm = <Loading />;
  }
  if (optionsStatus === "failed") {
    choiceForm = <p>Error: {optionsError}</p>;
  }

  return (
    <>
      <Headline data-testid="home">
        <Headline.Title>
          <span>Stop deciding,</span> <span>start watching</span>
        </Headline.Title>
        <Headline.Subhead>
          Choose from 1000s of acclaimed movies.
          <br />
          Filter by genre, decade, and runtime.
        </Headline.Subhead>
      </Headline>
      {choiceForm}
    </>
  );
}
