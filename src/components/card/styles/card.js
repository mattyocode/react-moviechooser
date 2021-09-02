import styled from "styled-components/macro";

export const Container = styled.div`
  position: relative;
  border-radius: 5px;
  background: rgba(34, 34, 34, 0.5);
  width: 100%;
  margin: 1rem auto;
  max-width: 430px;
  cursor: pointer;
  overflow: hidden;

  &.open {
    max-height: auto;
  }

  &.closed {
    max-height: 17rem;
  }

  @media screen and (min-width: 1200px) {
    display: flex;
  }
`;

export const Group = styled.div`
  margin: 2rem auto;
  padding: 0 1rem;
  max-width: 940px;

  @media screen and (min-width: 1200px) {
    display: flex;
    flex-wrap: wrap;
  }

  @media screen and (min-width: 2000px) {
    max-width: 1440px;
  }
`;

export const Content = styled.article`
  display: flex;
  /* padding-bottom: 2.5rem; */
`;

export const Sidebar = styled.section`
  flex: 1 1 40%;
  min-width: 40%;
  max-width: 40%;
  /* margin-bottom: 0.25rem; */
`;

export const AvgRating = styled.div`
  position: absolute;
  top: 0px;
  left: 5px;
  z-index: 10;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 3rem;
    width: 3rem;
  }

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
  border-radius: 5px 0 0 0;
  /* transition: height 0.75s cubic-bezier(0.5, 0, 0.1, 1); */
  transition: height 0.5s ease-in-out;

  height: 11rem;

  &.closed {
    height: 100%;

    border-radius: 5px 0 0 5px;
    transition: height 0.5s ease-in-out;
  }

  @media screen and (min-width: 375px) {
    height: 13rem;
  }
  @media screen and (min-width: 425px) {
    height: 16rem;
  }
  /* @media screen and (min-width: 768px) {
    height: 16rem;
  } */
`;

export const AllRatings = styled.div`
  display: flex;
  font-size: 0.5rem;
  padding: 2px;
  margin: 0.5rem 1rem 1.5rem 1rem;
  justify-content: center;
  align-items: center;
  /* height: auto; */
  transition: height 0.5s cubic-bezier(0.5, 0, 0.1, 1);

  &.closed {
    display: none;
    padding: 0;
    margin: 0;
    /* height: 0; */
    transition: height 0.5s cubic-bezier(0.5, 0, 0.1, 1);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: flex-end;
    margin-top: 0.3rem;
    width: 7rem;
  }

  li {
    display: flex;
    align-items: center;
    text-align: end;
  }

  @media screen and (min-width: 375px) {
    font-size: 0.75rem;
    margin: 1rem 1rem 1.5rem 1rem;
  }

  @media screen and (min-width: 450px) {
    width: 100%;
    font-size: 1rem;
    margin: 0.7rem 1rem 2rem 1rem;
  }

  @media screen and (min-width: 768px) {
    ul {
      width: 6rem;
    }
  }
`;

export const RatingLogo = styled.img`
  height: 10px;
  margin: 3px;

  @media screen and (min-width: 375px) {
    height: 12px;
    margin: 4px;
  }

  @media screen and (min-width: 450px) {
    height: 15px;
    margin: 5px;
  }
`;

export const StarRating = styled.div`
  display: inline-block;
  font-size: 8px;
  font-family: Times;
  line-height: 2;
  margin: 0 5px;

  &::before {
    content: "★★★★★";
    letter-spacing: 1px;
    background: linear-gradient(
      90deg,
      #fc0 ${(props) => props.rating},
      #444 ${(props) => props.rating}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const MainContent = styled.section`
  flex: 1 1 60%;
  padding: 0 0.75rem 0.5rem 0.75rem;
  margin: 0 auto;
  max-width: 60%;
  min-width: 60%;
  margin-bottom: 2.5rem;

  p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.65rem;
    margin: 0.75rem 0;
  }

  @media screen and (min-width: 375px) {
    margin-bottom: 2rem;

    p {
      font-size: 0.8rem;
    }
  }
  @media screen and (min-width: 450px) {
    margin-bottom: 3.5rem;
  }
`;

export const Header = styled.header`
  margin: 0.7rem 0;

  h2 {
    font-size: 1.2rem;
  }

  p {
    text-wrap: 
    margin: 0.1rem 0 !important;
  }

  @media screen and (min-width: 375px) {
    h2 {
      font-size: 1.5rem;
      margin-top: 1.5rem;
    }

    p {
      font-size: 0.8rem;
      margin: 0.5rem 0 1rem 0;
    }

    @media screen and (min-width: 450px) {
      /* .content-wrapper {
        padding-bottom: 1.5rem;
      } */

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

export const Plot = styled.p`
  margin: 0.3rem 0 !important;
`;

export const FurtherInfo = styled.div`
  height: auto;
  -webkit-transition: height 0.8s;
  -moz-transition: height 0.8s;
  transition: height 0.8s;
  /* transition: height 0.5s cubic-bezier(0.5, 0, 0.1, 1); */

  &.closed {
    height: 0;
    display: none;
    overflow: hidden;
    padding: 0;
    margin: 0;
    /* transition: height 0.5s cubic-bezier(0.5, 0, 0.1, 1); */
  }
`;

export const Genres = styled.div`
  max-width: 100%;
  overflow-x: auto;
  padding: 0.2rem 0;

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

  @media screen and (min-width: 375px) {
    ul {
      padding-left: 0.1rem;
      margin-bottom: 0.5rem;
    }
    li {
      font-size: 0.75rem;
    }
  }

  @media screen and (min-width: 450px) {
    ul {
      display: inline-flex;
      justify-content: start;
      flex-wrap: wrap;

      -webkit-overflow-scrolling: touch;
      padding-left: 0;
    }
    li {
      font-size: 0.75rem;
      margin: 0.1rem 0.15rem;
    }
  }
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  font-size: 2rem;
`;

export const ActionIcons = styled.div`
  * {
    margin: 0.25rem 0.8rem;
    font-size: 1.4rem;
  }
`;

// export const MoreIcon = styled(MdExpandMore)`
//   color: blue;
// `;

// export const LessIcon = styled(MdExpandLess)`
//   color: #222;
// `;
