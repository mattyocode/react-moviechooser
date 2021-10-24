import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { About, Headline, Loading } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";
import { fetchOptions } from "../store/query-slice";
import { fetchMovies, setMovieQuery } from "../store/movies-slice";

import homepageData from "../fixtures/homepage.json";
import largeLogo from "../assets/png/logo_large.png";

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
        genreList={genres.slice(0, 21)}
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
          Filter by genre, release decade, and runtime.
        </Headline.Subhead>
      </Headline>
      {choiceForm}
      <About src={largeLogo} id="about">
        <h2>About MOVIECHOOSER</h2>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sem
          velit, condimentum quis dolor finibus, laoreet ornare sem. In
          dignissim.
        </p>
        <br />
        <p>
          Maecenas porta euismod mi ac volutpat. In in leo tempor, pellentesque
          urna non, ultricies elit. Sed ipsum purus, malesuada vel est ut,
          eleifend semper ligula. In tempus ultricies pretium. Cras sit amet
          viverra ex.
        </p>
        <br />
        <p>
          Nullam posuere nibh quis porta ullamcorper. Aliquam fringilla
          hendrerit lectus, sed dignissim velit varius in. Phasellus egestas
          quam eget lectus viverra finibus. Vestibulum quis tempor velit.{" "}
        </p>
      </About>
    </>
  );
}
