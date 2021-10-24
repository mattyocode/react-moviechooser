import styled from "styled-components/macro";

export const AboutWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 2rem 2rem 8rem 2rem;
  text-align: center;
  max-width: 480px;

  @media screen and (min-width: 800px) {
    padding: 4rem 2rem 12rem 2rem;
  }
`;

export const LogoImg = styled.img`
  height: 8rem;
  padding: 1rem;
`;
