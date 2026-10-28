import React, { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { Card, Headline, Loading } from "../components";
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
    opacity: 0,
    transition: { duration: 0.15 },
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

  const isSurprise = params.movieId === "surprise";

  let route = "";
  if (isSurprise) {
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
      {isSurprise ? (
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
        <Card.Group>
          <CardContainer movie={movie} expandInitially={true} />
        </Card.Group>
      )}
      {isSurprise && moviesStatus === "succeeded" && (
        <Card.MoreBtnWrapper>
          <Card.MoreBtn
            data-testid="spin-again-btn"
            onClick={() => dispatch(fetchSingleMovie("random"))}
          >
            Spin again
          </Card.MoreBtn>
        </Card.MoreBtnWrapper>
      )}
      {moviesStatus === "failed" && <p>Error: {moviesError} </p>}
    </motion.div>
  );
}
