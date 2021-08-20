import React, { useState, useContext, createContext } from "react";
import {
  MdExpandMore,
  MdExpandLess,
  MdShare,
  MdOndemandVideo,
  MdLibraryAdd,
} from "react-icons/md";
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
  ActionIcons,
} from "./styles/card";

import { ImdbRating, Metacritic, RottenTomatoes, Star } from "../../assets";

const CardExpandContext = createContext();

export default function Card({ children, ...restProps }) {
  const [expand, setExpand] = useState(false);

  return (
    <CardExpandContext.Provider value={{ expand, setExpand }}>
      <Container data-testid="card" {...restProps}>
        {children}
      </Container>
    </CardExpandContext.Provider>
  );
}

Card.Group = function CardGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Card.Content = function CardContent({ children, ...restProps }) {
  const { setExpand } = useContext(CardExpandContext);
  return (
    <Content
      data-testid="content"
      onClick={() => setExpand((expand) => !expand)}
      {...restProps}
    >
      {children}
    </Content>
  );
};

Card.Sidebar = function CardSidebar({ children, ...restProps }) {
  return <Sidebar {...restProps}>{children}</Sidebar>;
};

Card.AvgRating = function CardAvgRating({ children, ...restProps }) {
  return (
    <AvgRating {...restProps}>
      <p>{children}</p>
      <img src={Star} alt="average rating star" />
    </AvgRating>
  );
};

Card.Image = function CardImage({ src, ...restProps }) {
  const { expand } = useContext(CardExpandContext);
  return <Image className={!expand && "closed"} src={src} {...restProps} />;
};

Card.AllRatings = function CardAllRatings({ ratings, ...restProps }) {
  const { expand } = useContext(CardExpandContext);
  const reviewSource = (name) => {
    switch (name) {
      case "imdbRating":
        return <RatingLogo src={ImdbRating} />;
      case "metacritic":
        return <RatingLogo src={Metacritic} />;
      case "rottenTomatoes":
        return <RatingLogo src={RottenTomatoes} />;
      default:
        return <p>{name}</p>;
    }
  };

  return (
    <AllRatings className={!expand && "closed"} {...restProps}>
      <ul>
        {ratings
          ? ratings.map((rating, idx) => {
              return (
                <li key={idx}>
                  {reviewSource(`${Object.keys(rating)}`)}
                  <StarRating rating={`${Object.values(rating)}%`}></StarRating>
                </li>
              );
            })
          : null}
      </ul>
    </AllRatings>
  );
};

Card.Main = function CardMain({ children, ...restProps }) {
  return <MainContent {...restProps}>{children}</MainContent>;
};

Card.Header = function CardHeader({
  title,
  released,
  runtime,
  plot,
  ...restProps
}) {
  const { expand } = useContext(CardExpandContext);
  const isFullWidth = useMediaQuery({ query: "(min-width: 450px" });
  const year = released ? released.slice(0, 4) : "";
  return (
    <>
      <Header {...restProps}>
        <h2>{title}</h2>
        <p>
          {year} | {runtime}
        </p>
      </Header>
      {expand || isFullWidth ? (
        <Plot>{plot}</Plot>
      ) : (
        <Plot>
          {`${plot.slice(0, 75)}... `}
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
        {starring && starring.join(", ")}
      </p>
      <p>
        <b>Directed by: </b>
        {director && director.join(", ")}
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
          ? genres.map((genre, idx) => {
              return <li key={idx}>{genre}</li>;
            })
          : null}
      </ul>
    </Genres>
  );
};

Card.Footer = function CardFooter({ ...restProps }) {
  return (
    <Footer {...restProps}>
      <MdExpandMore color="000" />
      <ActionIcons>
        <MdShare />
        <MdOndemandVideo />
        <MdLibraryAdd />
      </ActionIcons>
    </Footer>
  );
};
