import styled from "styled-components";

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Shown when a movie has no poster that loads: the site's poster gradient,
// with the title on it unless the title is shown big nearby anyway.
export const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--space-4);
  background: radial-gradient(
      circle at 30% 20%,
      hsl(187 62% 58% / 0.25),
      transparent 60%
    ),
    linear-gradient(160deg, var(--clr-bg-1), var(--clr-bg-2));
  color: var(--clr-text);
  font: 700 var(--fs-xl)/1.1 var(--font-display);
  text-align: center;
  text-transform: uppercase;
  overflow-wrap: anywhere;
`;
