import React, { useState, useContext, createContext } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

import {
  Container,
  Group,
  Content,
  Sidebar,
  AvgRating,
  Image,
  AllRatings,
  RatingLogo,
  StarRating,
  MainContent,
  Header,
  Plot,
  FurtherInfo,
  Genres,
  Footer,
  Actions,
  Action,
  Icon,
  Text,
} from "./styles/card";

import * as IconAssets from "../../assets";

const CardExpandContext = createContext();

export default function Card({ children, expandState = false, ...restProps }) {
  const [expand, setExpand] = useState(expandState);

  return (
    <CardExpandContext.Provider value={{ expand, setExpand }}>
      <Container
        data-testid="card"
        className={expand ? "open" : "closed"}
        {...restProps}
      >
        {children}
      </Container>
    </CardExpandContext.Provider>
  );
}

Card.Group = function CardGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Card.Content = function CardContent({ children, ...restProps }) {
  return (
    <Content data-testid="content" {...restProps}>
      {children}
    </Content>
  );
};

Card.Sidebar = function CardSidebar({ children, ...restProps }) {
  const { setExpand } = useContext(CardExpandContext);
  return (
    <Sidebar onClick={() => setExpand((expand) => !expand)} {...restProps}>
      {children}
    </Sidebar>
  );
};

Card.AvgRating = function CardAvgRating({ children, ...restProps }) {
  return (
    <AvgRating {...restProps}>
      <p>{children}</p>
      <img src={IconAssets.Star} alt="average rating star" />
    </AvgRating>
  );
};

Card.Image = function CardImage({ src, ...restProps }) {
  const { expand } = useContext(CardExpandContext);
  return <Image className={!expand && "closed"} src={src} {...restProps} />;
};

Card.AllRatings = function CardAllRatings({ ratings, ...restProps }) {
  const { expand } = useContext(CardExpandContext);

  const getIcon = (name) => {
    let Icon = IconAssets[name];
    if (Icon) {
      return <RatingLogo src={Icon} />;
    } else {
      return <p>{name}</p>;
    }
  };

  return (
    <AllRatings className={!expand && "closed"} {...restProps}>
      <ul>
        {ratings
          ? ratings.map((rating) => {
              return (
                <li key={rating.id}>
                  {getIcon(rating.source)}
                  <StarRating rating={`${rating.score}%`}></StarRating>
                </li>
              );
            })
          : null}
      </ul>
    </AllRatings>
  );
};

Card.Main = function CardMain({ children, ...restProps }) {
  const { setExpand } = useContext(CardExpandContext);
  return (
    <MainContent
      data-testid="card-main"
      onClick={() => setExpand((expand) => !expand)}
      {...restProps}
    >
      {children}
    </MainContent>
  );
};

Card.Header = function CardHeader({
  title,
  released,
  runtime,
  plot,
  ...restProps
}) {
  const { expand } = useContext(CardExpandContext);
  const isFullWidth = useMediaQuery({ query: "(min-width: 450px)" });
  const year = released ? released.slice(0, 4) : "";
  const copyCondenser = (copy, maxLength, moreSuffix = false) => {
    if (copy.length > maxLength) {
      copy =
        copy.slice(0, maxLength - 4) + " ... " + (moreSuffix ? "more" : "");
    }
    return copy;
  };
  return (
    <>
      <Header {...restProps}>
        {/* <h2>{title}</h2> */}
        {expand ? (
          <h2>{title}</h2>
        ) : (
          <h2>
            {isFullWidth
              ? `${copyCondenser(title, 44)} `
              : `${copyCondenser(title, 33)} `}
          </h2>
        )}
        <p>
          {year} | {runtime} mins
        </p>
      </Header>
      {expand ? (
        <Plot>{plot}</Plot>
      ) : (
        <Plot>
          {isFullWidth
            ? `${plot.slice(0, 150)}... `
            : `${plot.slice(0, 75)}... `}
          {/* {plot.slice(0, 75)} */}
          <b>more</b>
        </Plot>
      )}
    </>
  );
};

Card.FurtherInfo = function CardFurtherInfo({
  starring,
  director,
  country,
  ...restProps
}) {
  const { expand } = useContext(CardExpandContext);
  return (
    <FurtherInfo className={!expand && "closed"} {...restProps}>
      <p>
        <b>Starring: </b>
        {starring}
      </p>
      <p>
        <b>Directed by: </b>
        {director}
      </p>
      <p>{country}</p>
    </FurtherInfo>
  );
};

Card.Genres = function CardGenres({ genres, ...restProps }) {
  return (
    <Genres {...restProps}>
      <ul>
        {genres
          ? genres.map((genre) => {
              return <li key={genre.id}>{genre.name}</li>;
            })
          : null}
      </ul>
    </Genres>
  );
};

Card.Footer = function CardFooter({ children, ...restProps }) {
  const { expand, setExpand } = useContext(CardExpandContext);
  return (
    <Footer {...restProps}>
      {!expand ? (
        <MdExpandMore
          fill="#666"
          onClick={() => setExpand((expand) => !expand)}
        />
      ) : (
        <MdExpandLess
          fill="#666"
          onClick={() => setExpand((expand) => !expand)}
        />
      )}
      <Actions>{children}</Actions>
    </Footer>
  );
};

Card.Action = function CardAction({ label, children, ...restProps }) {
  return (
    <Action {...restProps}>
      <Icon>{children}</Icon>
    </Action>
  );
};
