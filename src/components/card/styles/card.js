import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  position: relative;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-md);
  background: var(--clr-surface);
  backdrop-filter: var(--blur-panel);
  -webkit-backdrop-filter: var(--blur-panel);
  box-shadow: var(--shadow-panel);
  width: 100%;
  margin: 1rem auto;
  max-width: 430px;
  overflow: hidden;

  @media screen and (min-width: 1200px) {
    display: flex;
  }
`;

// Single-card layout (detail page): stacks the card and its call to action.
export const Detail = styled.div`
  max-width: 940px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

export const Content = styled.article`
  display: flex;
`;

export const Sidebar = styled.section`
  flex: 1 1 40%;
  min-width: 40%;
  max-width: 40%;
`;

export const AvgRating = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.3rem;
  width: 2.4rem;
  background: var(--clr-neon);
  border-radius: var(--radius-pill);
  box-shadow: var(--glow-neon);

  p {
    position: absolute;
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--clr-on-neon);
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
  height: 11rem;

  @media screen and (min-width: 375px) {
    height: 13rem;
  }
  @media screen and (min-width: 425px) {
    height: 16rem;
  }
`;

export const AllRatings = styled.div`
  display: flex;
  font-size: 0.5rem;
  padding: 2px;
  margin: 0.5rem 1rem 1.5rem 1rem;
  justify-content: center;
  align-items: center;

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
    color: var(--clr-text-muted);
    font-size: 0.65rem;
    line-height: 1.45;
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
    padding: 0.05rem 0.5rem;
    color: var(--clr-neon);
    background-color: var(--clr-neon-faint);
    border: 1px solid var(--clr-neon-soft);
    border-radius: var(--radius-pill);
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
  justify-content: flex-end;
  padding: 0.25rem 0.5rem;
  font-size: 2rem;
`;

export const Actions = styled.div`
  display: flex;
`;

export const Action = styled(motion.button)`
  display: inline-block;
  border: none;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0.25rem 0.7rem;

  &:hover {
    background-color: var(--clr-hover);
    box-shadow: 0 0 10px 5px var(--clr-hover);
  }
`;

export const FixedAction = styled(motion.button)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border: none;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0.25rem 0.7rem;
  color: #000;

  &:hover {
    background-color: var(--clr-hover);
    box-shadow: 0 0 10px 5px var(--clr-hover);
  }
`;

export const Icon = styled.div`
  margin: auto;
`;

export const Text = styled.p`
  padding-top: 0;
  color: white;
  font-size: 0.5rem;
  text-align: center;

  @media screen and (min-width: 450px) {
    font-size: 0.6rem;
  }
`;

export const Note = styled.p`
  color: var(--clr-text-muted);
  text-align: center;
`;

export const Empty = styled.div`
  max-width: 420px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  text-align: center;

  p {
    color: var(--clr-text-muted);
    margin: 0.75rem 0 1.5rem 0;
  }
`;

export const MoreBtnWrapper = styled.div`
  max-width: 350px;
  height: 3rem;
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem 1rem 3rem 1rem;
`;

export const MoreBtn = styled(motion.button)`
  max-width: 25rem;
  margin: 0 auto;
  min-width: 10rem;
  height: 3rem;
  padding: 0 var(--space-6);
  border-radius: var(--radius-pill);
  border-style: hidden;
  background-image: var(--gradient-cta);
  box-shadow: 0 0 1.5rem hsl(170 60% 55% / 0.35);
  cursor: pointer;
  text-align: center;
  justify-content: center;
  color: var(--clr-on-neon);
  font: 700 1.1rem var(--font-display);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;
