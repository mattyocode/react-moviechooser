import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { NavbarContainer } from "../containers/navigation";
import { Headline } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";
import { fetchOptionsData, fetchMovies } from "../store/query-actions";

export default function Home() {
  const options = useSelector((state) => state.options.options);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchOptionsData());
  }, [dispatch]);

  const getQueryResults = (selectionObj) => {
    dispatch(fetchMovies(selectionObj));
    console.log(selectionObj);
    // redirect to results page.
    history.push("/movies");
  };

  let choiceForm;
  if (options.genre && options.decade && options.runtime) {
    choiceForm = (
      <ChoiceFormContainer
        genreList={options.genre}
        runtimeData={options.runtime}
        decadeData={options.decade}
        onSubmitHandler={getQueryResults}
      />
    );
  }
  if (notification && notification.status === "loading") {
    choiceForm = <p>Loading...</p>;
  }
  if (notification && notification.status === "error") {
    choiceForm = <p>{`${notification.title}: ${notification.message}`}</p>;
  }

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
      {choiceForm}
    </>
  );
}
