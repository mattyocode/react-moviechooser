import styled from "styled-components/macro";

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

export const ToggleBtn = styled.button`
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
  height: 0rem;
  overflow: hidden;
  transition: all 0.3s linear;
  min-width: 50%;
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

  @media screen and (min-width: 800px) {
    display: flex;
  }
`;

export const Link = styled.li`
  & a {
    letter-spacing: 0.1rem;
    display: block;
    padding: 0.5rem 1rem;
    transition: all 0.3s linear;
    text-decoration: none;
  }

  & a:hover {
    background: black;
    color: grey;
  }

  @media screen and (min-width: 800px) {
    & a {
      padding: 0;
      margin: 0 0.5rem;
      font-size: 1rem;
    }
    & a:hover {
      padding: 0;
      background: transparent;
    }
    & li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
