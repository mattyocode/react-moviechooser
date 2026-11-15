import styled from "styled-components";

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

// TMDB asks for its logo to be less prominent than the site's own.
export const AttributionLogoImg = styled.img`
  display: block;
  height: 1rem;
  margin: 0 auto 0.75rem;
`;
