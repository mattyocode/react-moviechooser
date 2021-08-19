import styled from "styled-components/macro";

export const Container = styled.div`
  position: relative;
  border-radius: 5px;
  background: rgba(34, 34, 34, 0.5);
  width: 100%;
  margin: 1rem auto;
  max-width: 430px;
`;

export const Group = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Content = styled.article`
  display: flex;
  padding-bottom: 2.5rem;
`;

export const Sidebar = styled.section`
  flex: 1 1 40%;
  min-width: 40%;
`;

export const AvgRating = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 10;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    position: absolute;
    font-size: 0.7rem;
    font-weight: bold;
    color: black;
    z-index: 15;
    margin: auto;
  }
`;

export const Image = styled.img`
  position: relative;
  top: 0px;
  left: 0px;
  object-fit: cover;
  width: 100%;
  max-height: 85%;
  border-radius: 5px 0 0 0;
`;

export const AllRatings = styled.div`
  display: flex;
  font-size: 0.5rem;
  padding: 2px;
  margin: 0.3rem 1rem;
  justify-content: center;
  align-items: center;

  img {
    height: 10px;
    margin: 3px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: flex-end;
    width: 6rem;
  }

  li {
    display: flex;
    align-items: center;
    text-align: end;
  }
`;

export const StarRating = styled.div`
   /* calc(var(--rating) / 5 * 100%); */
   --percent:: calc(${(props) =>
     props.rating ? props.rating : "0"} / 5 * 100%);

  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
  line-height: 1;

  &::before {
    content: "★★★★★";
    letter-spacing: 1px;
    background: linear-gradient(
      90deg,
      var(--star-background) var(--percent),
      var(--star-color) var(--percent)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const MainContent = styled.section`
  flex: 1 1 60%;
  padding: 0 0.75rem;
  margin: 0 auto;
  max-width: 60%;

  p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.65rem;
    margin: 0.75rem 0;
  }
`;
// include child p tags

export const Header = styled.header`
  margin: 0.7rem 0 0 0;

  h2 {
    font-size: 1.2rem;
  }

  p {
    margin: 0.3rem 0;
  }

  @media screen and (min-width: 375px) {
    h2 {
      font-size: 1.5rem;
      margin-top: 1.5rem;
    }

    p {
      font-size: 0.7rem;
      margin: 0.5rem 0 1rem 0;
    }

    @media screen and (min-width: 450px) {
      .content-wrapper {
        padding-bottom: 1.5rem;
      }

      p {
        font-size: 0.8rem;
      }

      .genres ul {
        flex-wrap: unset;
        white-space: unset;
      }
    }
  }
`;

export const Plot = styled.p``;

export const FurtherInfo = styled.div``;

export const Genres = styled.div`
  max-width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    display: inline-flex;
    justify-content: center;
    flex-wrap: nowrap;

    -webkit-overflow-scrolling: touch;
  }

  ul::-webkit-scrollbar {
    height: 1px;
  }

  li {
    min-width: 2rem;
    flex: 0 0 auto;
    font-size: 0.6rem;
    margin: 0 0.1rem;
    padding: 0 0.25rem;
    color: #222;
    background-color: var(--clr-neon);
    border: 2px solid var(--clr-neon);
    border-radius: 10px;
    display: inline-block;
  }

  @media screen and (min-width: 450px) {
    ul {
      display: inline-flex;
      justify-content: start;
      flex-wrap: wrap;

      -webkit-overflow-scrolling: touch;
    }
    li {
      font-size: 0.75rem;
      margin: 0.1rem;
    }
  }
`;

export const Footer = styled.div`
  position: absolute;
  /* position: relative; */
  bottom: 0;
  display: flex;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
`;

export const ActionIcons = styled.div`
  * {
    margin: 0.25rem 0.6rem;
  }
`;
