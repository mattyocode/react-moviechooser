import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

import { About, Headline, Loading, Footer } from "../components";
import { ChoiceFormContainer } from "../containers/choice-form";
import { fetchOptions } from "../store/query-slice";
import { fetchMovies, setMovieQuery } from "../store/movies-slice";
import homepageData from "../fixtures/homepage.json";
import largeLogo from "../assets/png/logo_large.png";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.25, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

export function Home() {
  const genres = useSelector((state) => state.options.options);
  const optionsStatus = useSelector((state) => state.options.status);
  const optionsError = useSelector((state) => state.options.error);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(genres).length === 0) {
      dispatch(fetchOptions());
    }
  }, [dispatch, genres]);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Headline
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.75 }}
        data-testid="home"
      >
        <Headline.Title>
          <span>Stop deciding,</span> <span>start watching</span>
        </Headline.Title>
        <Headline.Subhead>
          Choose from 1000s of acclaimed movies.
          <br />
          Filter by genre, release decade, and runtime.
          <br />
          Click through to streaming services.
        </Headline.Subhead>
      </Headline>
      {choiceForm}
      {optionsStatus === "succeeded" && (
        <>
          <About src={largeLogo} id="about">
            <h2>About MOVIECHOOSER</h2>
            <br />
            <p>
              Tired of spending so much time figuring out <i>what</i> to watch
              that you give up and put on a TV show you could recite from
              memory? Then say hello to MOVIECHOOSER.
            </p>
            <br />
            <p>
              MOVIECHOOSER is 1000s of stand-out movies all a few clicks away –
              from classics and critics' favourites to box office hits and
              hidden gems.
            </p>
            <br />
            <p>
              Search based on the fundamental things that define a film: what
              it's about (genre), when it was made (release decade), and how
              long it is (runtime). Then browse the results and start watching.
            </p>
            <br />
            <p>
              Or, if you want to let fate decide, click{" "}
              <a href="/movies/surprise/">'Surprise Me'</a> for a totally random
              movie choice from the collection. Click through to play movie on
              streaming services, where available (UK-only for now).
            </p>
            <br />
            <p>
              Life's too short for bad movies. <br />
              Chooser better with MOVIECHOOSER.
            </p>
          </About>
          <Footer />
        </>
      )}
    </motion.div>
  );
}

export const MemoizedHome = React.memo(Home);
