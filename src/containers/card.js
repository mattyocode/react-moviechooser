import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdOndemandVideo,
  MdRemoveRedEye,
  MdShare,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Card, Modal } from "../components";
import { addNewListItem, deleteListItem, updateListItem } from "../store/list-slice";
import { setMovieOnList } from "../store/movies-slice";
import { AuthForm } from "./auth-form";
import { OndemandContainer } from "./ondemand";
import { ShareContainer } from "./share";

export function CardContainer({
  movie,
  expandInitially = false,
  listData = null,
}) {
  const [ondemandOpen, setOndemandOpen] = useState(false);
  const [ondemandData, setOndemandData] = useState({});
  const [shareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState({});
  const [authOpen, setAuthOpen] = useState(false);
  const user = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();

  const is_auth = user && user.account;
  const on_list = movie.on_list || listData;

  const closeOndemandHandler = () => {
    setOndemandOpen(false);
    setOndemandData({});
  };
  const openOndemandHandler = (data) => {
    setOndemandData(data);
    setOndemandOpen(true);
  };

  const closeShareHandler = () => {
    setShareOpen(false);
    setShareData({});
  };
  const openShareHandler = (data) => {
    setShareData(data);
    setShareOpen(true);
  };

  const closeAuthHandler = () => {
    setAuthOpen(false);
  };
  const openAuthHandler = (data) => {
    setAuthOpen(true);
  };

  const addToListHandler = () => {
    if (user.account) {
      dispatch(addNewListItem(movie.slug));
      dispatch(
        setMovieOnList({
          movieSlug: movie.slug,
          onList: true,
        })
      );
    }
  };

  const removeFromListHandler = () => {
    if (user.account) {
      dispatch(deleteListItem(movie.slug));
      dispatch(
        setMovieOnList({
          movieSlug: movie.slug,
          onList: false,
        })
      );
    }
  };

  const toggleMovieWatchedHandler = () => {
    const watchedState = !listData.watched;
    dispatch(
      updateListItem({
        movieSlug: movie.slug,
        updatedFieldData: { watched: watchedState },
      })
    );
  };

  return (
    <>
      {ondemandOpen && ondemandData && (
        <Modal openState={ondemandOpen} closeModal={closeOndemandHandler}>
          <OndemandContainer data={ondemandData} />
        </Modal>
      )}
      {shareOpen && shareData && (
        <Modal openState={shareOpen} closeModal={closeShareHandler}>
          <ShareContainer data={shareData} />
        </Modal>
      )}
      {authOpen && (
        <Modal openState={authOpen} closeModal={closeAuthHandler}>
          <AuthForm
            formTypeInitial={"login"}
            subhead={"Login to add movies to list."}
            closeSelf={setAuthOpen}
          />
        </Modal>
      )}
      {movie && (
        <Card
          data-testid={`${movie.title}-card`}
          expandState={expandInitially}
          as={motion.div}
          layout="position"
        >
          <Card.Content>
            {listData && (
              <Card.FixedAction
                label="Watched"
                as={motion.button}
                whileHover={{ scale: 1.1 }}
              >
                <MdRemoveRedEye
                  data-testid={`${movie.title}-watchedBtn`}
                  fill={listData.watched ? "#fff" : "#666"}
                  onClick={toggleMovieWatchedHandler}
                  title="Watched?"
                />
              </Card.FixedAction>
            )}
            <Card.Sidebar>
              <Card.AvgRating>
                {movie.avg_rating ? movie.avg_rating.toFixed(1) : null}
              </Card.AvgRating>
              <Card.Image src={movie.poster_url} />
              <Card.AllRatings ratings={movie.reviews} />
            </Card.Sidebar>
            <Card.Main>
              <Card.Header
                title={movie.title}
                released={movie.released}
                runtime={movie.runtime}
                plot={movie.plot}
              />
              <Card.FurtherInfo
                starring={movie.actors.map((actor) => actor.name).join(", ")}
                director={movie.director
                  .map((director) => director.name)
                  .join(", ")}
                country={movie.country}
              />
              <Card.Genres genres={movie.genre} />
            </Card.Main>
            <Card.Footer show={!expandInitially}>
              {movie.ondemand && movie.ondemand.length > 0 && (
                <Card.Action
                  data-testid={`${movie.title}-ondemand`}
                  label="Watch"
                  onClick={() =>
                    openOndemandHandler({
                      title: movie.title,
                      imgUrl: movie.ondemandImg,
                      linksData: movie.ondemand,
                    })
                  }
                >
                  <MdOndemandVideo title="Stream movie" />
                </Card.Action>
              )}
              <Card.Action
                data-testid={`${movie.title}-share`}
                label="Share"
                onClick={() =>
                  openShareHandler({
                    title: movie.title,
                    posterUrl: movie.poster_url,
                    shareUrl: `www.moviechooser.co.uk/movies/${movie.slug}`,
                  })
                }
              >
                <MdShare title="Share movie page" />
              </Card.Action>
              <Card.Action label="Add to list">
                {is_auth && on_list && (
                  <MdBookmark
                    data-testid={`${movie.title}-remove`}
                    onClick={removeFromListHandler}
                    title="Remove from list"
                  />
                )}
                {is_auth && !on_list && (
                  <MdBookmarkBorder
                    data-testid={`${movie.title}-add`}
                    onClick={addToListHandler}
                    title="Add to list"
                  />
                )}
                {!is_auth && (
                  <MdBookmarkBorder
                    data-testid={`${movie.title}-unauthed`}
                    fill="#555"
                    onClick={openAuthHandler}
                    title="Login to add to list"
                  />
                )}
              </Card.Action>
            </Card.Footer>
          </Card.Content>
        </Card>
      )}
    </>
  );
}
