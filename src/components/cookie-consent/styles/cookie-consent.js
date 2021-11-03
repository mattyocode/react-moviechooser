import styled from "styled-components/macro";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const TextWrapper = styled.div`
  max-width: 780px;
  margin: 0 auto;

  h3 {
    padding: 0.5rem;
  }

  p {
    padding: 0.5rem;
    font-size: 0.85rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
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

export const BannerText = styled.div`
  margin: 0.25rem;
  font-size: 0.85rem;

  & > * {
    display: inline;
  }

  button {
    background: transparent;
    outline: none;
    border: none;
    text-decoration: underline;
    font-family: "HelveticaNeue-CondensedBold", "Helvetica Neue", "Helvetica",
      sans-serif;
    cursor: pointer;
  }

  @media screen and (min-width: 768px) {
    & > * {
      font-size: 0.9rem;
    }
  }
`;
