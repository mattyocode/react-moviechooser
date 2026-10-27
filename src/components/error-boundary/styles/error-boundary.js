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
  border-radius: 5px;
  background-image: linear-gradient(90deg, #51c7d6, #59d7b3 50%, #e3dc44);
  color: #111;
  font-weight: bold;
  text-decoration: none;
`;
