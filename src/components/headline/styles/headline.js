import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;

  @media screen and (min-width: 800px) {
    padding: 4rem 0 2rem 0;
    margin-top: 3rem;
  }
`;

export const Title = styled.h1`
  text-transform: uppercase;
`;

// Neon-lit word in a headline, using the CTA gradient as the fill.
export const Accent = styled.span`
  background-image: var(--gradient-cta);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 0.25em hsl(187 62% 58% / 0.45));
`;

export const Subhead = styled.h3`
  text-align: center;
  max-width: 34rem;
  color: var(--clr-text-muted);
  font-weight: 400;
  line-height: 1.5;
`;

export const DecoratedSubhead = styled.h3`
  overflow: hidden;
  text-align: center;

  & > span {
    position: relative;
    display: inline-block;
  }

  & > span:before,
  & > span:after {
    content: "";
    position: absolute;
    top: 50%;
    border-bottom: var(--clr-border) 2px solid;
    width: 25vw;
    margin: 0 20px;
  }

  & > span:before {
    right: 100%;
  }

  & > span:after {
    left: 100%;
  }

  @media screen and (min-width: 450px) {
    & > span:before,
    & > span:after {
      width: 10vw;
    }
  }
`;
