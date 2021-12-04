import React, { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { Headline, Loading } from "../components";
import { CardContainer } from "../containers/card";
import { fetchSingleMovie } from "../store/movies-slice";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.25, duration: 0.5 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

export default function MovieDetail() {
  const movie = useSelector((state) => state.movies.movies)[0];
  const moviesStatus = useSelector((state) => state.movies.status);
  const moviesError = useSelector((state) => state.movies.error);

  const location = useLocation();
  const locationRef = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();

  let route = "";
  if (params.movieId === "surprise") {
    route = "random";
  } else {
    route = `${params.movieId}`;
  }

  useEffect(() => {
    if (locationRef !== location.key) {
      dispatch(fetchSingleMovie(route));
    }
  }, [dispatch, route, location, locationRef]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {`${params.movieId}` === "surprise" ? (
        <Headline data-testid="surprise">
          <Headline.Title>Random has chosen</Headline.Title>
        </Headline>
      ) : (
        <Headline data-testid={`movie-detail-${params.movieId}`}>
          <Headline.Title>Check this out!</Headline.Title>
        </Headline>
      )}
      {moviesStatus === "updating" && <Loading />}
      {moviesStatus === "succeeded" && (
        <CardContainer movie={movie} expandInitially={true} />
      )}
      {moviesStatus === "failed" && <p>Error: {moviesError} </p>}
    </motion.div>
  );
}
