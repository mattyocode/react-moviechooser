import styled from "styled-components/macro";

export const Wrapper = styled.div`
  max-width: 780px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  padding: 0 0.5rem;
`;

export const HeaderIcon = styled.div`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 450px) {
    font-size: 2rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  width: 100%;
  text-align: center;
  padding: 0 1rem;

  & span {
    color: var(--clr-neon);
  }

  @media screen and (min-width: 450px) {
    font-size: 1.75rem;
  }
`;

export const BodyWrapper = styled.div`
  display: block;

  &.portrait {
    display: flex;
    justify-content: space-around;
  }
`;

export const Image = styled.img`
  width: 100%;
  padding: 1rem 0;
  max-height: 20rem;
  object-fit: cover;

  &.portrait {
    width: 40%;
  }
`;

export const Actions = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: wrap;

  &.portrait {
    width: 50%;
    align-content: center;

    @media screen and (min-width: 450px) {
      & > * {
        width: 3.5rem;
      }
    }
  }
`;

export const Action = styled.li`
  min-width: 2.5rem;
  margin: 0.5rem 0;
  cursor: pointer;
  display: flex;
  justify-content: space-around;

  & :hover {
    text-decoration: underline;
  }

  & button {
    border: none;
    text-decoration: none;
    background: transparent;
    font-family: inherit;
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  margin: auto;
`;

export const Icon = styled.img``;

export const IconText = styled.h5`
  padding-top: 0.25rem;
  width: 3rem;
  font-size: 0.6rem;
  text-align: center;
  margin: 0 auto;
  text-shadow: none;

  &.flash {
    text-shadow: 0 0 0.1em #51c7d6;
    color: #51c7d6;
    transition: text-shadow 1s ease-out;
    transition: color 1s ease-out;
  }

  @media screen and (min-width: 375px) {
    width: 5rem;
    font-size: 0.8rem;
  }
`;
