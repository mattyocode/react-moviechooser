import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;

  @media screen and (min-width: 800px) {
    padding-top: 8rem;
  }
`;

export const Title = styled.h1``;

export const Text = styled.p`
  margin: 1rem 0 2rem 0;
`;

export const HomeLink = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-pill);
  background-image: var(--gradient-cta);
  color: var(--clr-on-neon);
  font-weight: bold;
  text-decoration: none;
`;
