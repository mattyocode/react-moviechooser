import styled, { keyframes } from "styled-components/macro";
import { NavLink as ReactRouterLink } from "react-router-dom";

export const Nav = styled.nav`
  @media screen and (min-width: 800px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: linear-gradient(
      to bottom,
      black,
      rgba(0, 0, 0, 0.8) 75%,
      rgba(0, 0, 0, 0.1)
    );
  }
`;

export const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background-color: black;

  @media screen and (min-width: 800px) {
    padding: 0 1rem;
    background-color: transparent;
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
  position: absolute;
  right: 0;
  display: block;
  height: 0;
  overflow: hidden;
  transition: all 0.3s linear;
  min-width: 50%;
  background-color: black;
  border-radius: 0 0 0 5px;
  /* border: var(--clr-neon) 1px solid; */
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); */
  z-index: 90;

  @media screen and (min-width: 800px) {
    position: relative;
    min-width: max-content;
    display: flex;
    height: auto !important;
    padding: 0 1rem;
    background-color: transparent;
    border: none;
  }
`;

export const LinksList = styled.ul`
  list-style-type: none;
  padding: 1.5rem;

  @media screen and (min-width: 800px) {
    display: flex;
    justify-content: space-between;
    padding: 0;
  }
`;

export const NavBarLink = styled(ReactRouterLink)`
  letter-spacing: 0.1rem;
  display: block;
  transition: all 0.3s linear;
  text-decoration: none;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  margin: 0.5rem 0;

  border: ${(props) =>
    props.$highlight
      ? "1px solid rgba(83, 204, 202, 0.6)"
      : "1px solid rgba(0, 0, 0, 0)"};
  padding: 0.25rem 0.5rem;
  max-width: fit-content;
  box-shadow: ${(props) =>
    props.$highlight
      ? "inset 0 0 0.15em 0 var(--clr-neon), 0 0 0.15em 0 var(--clr-neon)"
      : "none"};

  &:hover {
    text-shadow: 0 0 0.5em hsl(0 0% 50% / 0.5), 0 0 0.01em currentColor;
    /* color: #587a92; */
    border: ${(props) =>
      props.$highlight
        ? "1px solid var(--clr-neon)"
        : "1px solid rgba(0, 0, 0, 0)"};

    background-color: #0f3030;
    box-shadow: 0 0 8px 2px #0f3030;
  }

  &.active {
    color: var(--clr-neon);
    border: 1px solid rgba(0, 0, 0, 0);
    /* border-bottom: 1px solid rgba(100, 100, 50, 0.5); */
  }

  &.grey {
    color: gray;
  }

  @media screen and (min-width: 800px) {
    font-size: 1rem;
    max-width: none;

    padding: 0.25rem 0.5rem;
    margin: 0 0.2rem;
    box-shadow: none;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

export const NavLinkBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 80;

  &.remove {
    display: none;
  }

  @media screen and (min-width: 800px) {
    display: none;
  }
`;
