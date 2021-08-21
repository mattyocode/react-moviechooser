import styled, { keyframes } from "styled-components/macro";
import { Link as ReactRouterLink } from "react-router-dom";

export const Nav = styled.nav`
  @media screen and (min-width: 800px) {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: black;
  }
`;

export const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: #000;

  @media screen and (min-width: 800px) {
    padding: 0 1rem;
  }
`;

export const Logo = styled.img`
  height: 40px;
`;

const animateIn = keyframes`
  from {
      transform: rotate(0deg);
  }

  to {
      transform: rotate(180deg);
  }
`;

const animateOut = keyframes`
  from {
      transform: rotate(180deg);
  }

  to {
      transform: rotate(0deg);
  }
`;

export const Icon = styled.div`
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.current ? 1 : 0)};
  animation-duration: ${(props) => (props.isInitial ? "0" : "500ms")};
  animation-name: ${(props) => (props.current ? animateIn : animateOut)};
  animation-timing-function: ease-out;
`;

export const Button = styled.button`
  position: relative;
  height: 48px;
  width: 48px;
  font-size: 1.5rem;
  color: white;
  background: transparent;
  border-color: transparent;
  transition: all 0.3s linear;
  cursor: pointer;

  &:hover {
    color: grey;
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

export const LinksContainer = styled.div`
  position: fixed;
  right: 0;
  display: block;
  height: 0;
  overflow: hidden;
  transition: all 0.3s linear;
  min-width: 40%;
  background-color: black;
  border-radius: 0 0 0 5px;
  z-index: 10;

  @media screen and (min-width: 800px) {
    position: relative;
    min-width: max-content;
    display: flex;
    height: auto !important;
    padding: 0 1rem;
  }
`;

export const LinksList = styled.ul`
  list-style-type: none;
  padding: 2rem;

  @media screen and (min-width: 800px) {
    display: flex;
    padding: 0;
  }
`;

export const NavBarLink = styled(ReactRouterLink)`
  letter-spacing: 0.1rem;
  display: block;
  transition: all 0.3s linear;
  text-decoration: none;
  border-radius: 10px;

  padding: ${(props) => (props.$highlight ? "0.25rem 0.5rem" : "0.5rem 1rem")};
  margin: ${(props) => (props.$highlight ? "0.25rem 0.5rem" : "0")};
  max-width: ${(props) => (props.$highlight ? "fit-content" : "none")};
  border: ${(props) => (props.$highlight ? "1px solid black" : "none")};
  background-color: ${(props) =>
    props.$highlight ? "var(--clr-neon)" : "inherit"};
  color: ${(props) => (props.$highlight ? "black" : "inherit")};

  &:hover {
    text-shadow: 0 0 0.1em hsl(0 0% 100% / 0.3), 0 0 0.1em currentColor;
    color: var(--clr-neon);
    border: ${(props) =>
      props.$highlight ? "1px solid var(--clr-neon)" : "none"};
    background: transparent;
  }

  @media screen and (min-width: 800px) {
    font-size: 1rem;
    max-width: none;

    padding: 0.25rem 0.5rem;
    margin: 0 0.2rem;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
