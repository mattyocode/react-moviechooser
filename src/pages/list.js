import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CardContainer } from "../containers/card";
import { Headline, Loading, Card } from "../components";
import { addListItems, fetchListItems } from "../store/list-slice";

export default function Movies() {
  const list_items = useSelector((state) => state.list.list_items);
  const listStatus = useSelector((state) => state.list.status);
  const listError = useSelector((state) => state.list.error);
  const nextPage = useSelector((state) => state.list.nextPageUrl);
  const itemCount = useSelector((state) => state.list.totalCount);

  const dispatch = useDispatch();

  console.log("list_items in list >", list_items);

  const moreItems = itemCount > 0 && list_items.length < itemCount;

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
    <>
      <Headline data-testid="watch-list">
        <Headline.Title>Watch List</Headline.Title>
      </Headline>
      <Card.Group>
        {list_items &&
          list_items.length > 0 &&
          list_items.map((item) => {
            return (
              <CardContainer
                key={item.movie.slug}
                movie={item.movie}
                isListItem={true}
              />
            );
          })}
      </Card.Group>
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
    </>
  );
}
