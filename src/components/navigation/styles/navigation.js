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
  padding: 1rem 1.5rem;
  background: #000;

  @media screen and (min-width: 800px) {
    padding: 0;
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
  display: block;
  height: 0;
  overflow: hidden;
  transition: all 0.3s linear;
  min-width: 40%;
  float: right;
  background-color: black;
  border-radius: 0 0 0 5px;

  @media screen and (min-width: 800px) {
    min-width: max-content;
    display: flex;
    height: auto !important;
    padding: 0;
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

export const NavLink = styled(ReactRouterLink)`
  letter-spacing: 0.1rem;
  display: block;
  transition: all 0.3s linear;
  text-decoration: none;
  border-radius: 5px;

  padding: ${(props) => (props.border ? "0.25rem 0.5rem" : "0.5rem 1rem")};
  margin: ${(props) => (props.border ? "0.25rem 0.5rem" : "0")};
  max-width: ${(props) => (props.border ? "fit-content" : "none")};
  border: ${(props) => (props.border ? "1px solid white" : "none")};

  &:hover {
    background: black;
    color: blue;
  }

  @media screen and (min-width: 800px) {
    font-size: 1rem;
    max-width: none;

    padding: 0.25rem 0.5rem;
    margin: 0 0.2rem;

    &:hover {
      color: grey;
      background: transparent;
    }
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
