import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimateSharedLayout, useReducedMotion } from "framer-motion";

import { CardContainer } from "../containers/card";
import { Headline, Loading, Card, PosterCard } from "../components";
import { addListItems, fetchListItems } from "../store/list-slice";

const pageVariants = {
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

export default function List() {
  const list_items = useSelector((state) => state.list.list_items);
  const listStatus = useSelector((state) => state.list.status);
  const listError = useSelector((state) => state.list.error);
  const nextPage = useSelector((state) => state.list.nextPageUrl);
  const itemCount = useSelector((state) => state.list.totalCount);

  const dispatch = useDispatch();
  const reduceMotion = useReducedMotion();

  const moreItems = itemCount > 0 && list_items.length < itemCount;

  const unwatchedItems = list_items.filter((item) => !item.watched);
  const watchedItems = list_items.filter((item) => item.watched);

  const addListItemsHandler = () => {
    dispatch(addListItems(nextPage));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    dispatch(fetchListItems());
  }, [dispatch]);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Headline data-testid="watch-list">
        <Headline.Title>Watch List</Headline.Title>
      </Headline>
      <AnimateSharedLayout>
        <Headline.DecoratedSubhead>
          <span>Unwatched</span>
        </Headline.DecoratedSubhead>
        <PosterCard.Grid>
          {unwatchedItems &&
            unwatchedItems.length > 0 &&
            unwatchedItems.map((item, idx) => {
              const { added, watched } = item;
              return (
                <motion.div
                  key={item.movie.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(idx, 10) * 0.03,
                  }}
                >
                  <CardContainer
                    movie={item.movie}
                    listData={{ added, watched }}
                    variant="poster"
                  />
                </motion.div>
              );
            })}
          {unwatchedItems.length < 1 && (
            <Headline.Subhead style={{ gridColumn: "1 / -1" }}>
              No unwatched movies on your list.
            </Headline.Subhead>
          )}
        </PosterCard.Grid>
        <Headline.DecoratedSubhead>
          <span>Watched</span>
        </Headline.DecoratedSubhead>
        <PosterCard.Grid>
          {watchedItems &&
            watchedItems.length > 0 &&
            watchedItems.map((item, idx) => {
              const { added, updated, watched } = item;
              return (
                <motion.div
                  key={item.movie.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(idx, 10) * 0.03,
                  }}
                >
                  <CardContainer
                    movie={item.movie}
                    listData={{ added, updated, watched }}
                    variant="poster"
                  />
                </motion.div>
              );
            })}
          {watchedItems.length < 1 && (
            <Headline.Subhead style={{ gridColumn: "1 / -1" }}>
              No watched movies on your list.
            </Headline.Subhead>
          )}
        </PosterCard.Grid>
      </AnimateSharedLayout>
      {listStatus === "loading" && (
        <div>
          <Loading />
        </div>
      )}
      {listStatus === "failed" && (
        <div>
          <p>Error: {listError}</p>
        </div>
      )}
      <Card.MoreBtnWrapper>
        {moreItems && listStatus === "succeeded" && (
          <Card.MoreBtn onClick={addListItemsHandler}>More</Card.MoreBtn>
        )}
        {!moreItems && listStatus === "succeeded" && (
          <p>No more movies on your list to load.</p>
        )}
        {listStatus === "updating" && <Loading small />}
      </Card.MoreBtnWrapper>
    </motion.div>
  );
}
