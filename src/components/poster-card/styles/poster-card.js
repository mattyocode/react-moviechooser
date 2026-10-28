import styled from "styled-components";
import { Link } from "react-router-dom";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--space-4);
  max-width: 1200px;
  margin: var(--space-6) auto;
  padding: 0 var(--space-4);

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: var(--space-6);
  }
`;

export const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-md);
  background: var(--clr-surface);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;

  @media (hover: hover) {
    &:hover,
    &:focus-within {
      transform: translateY(-4px);
      border-color: var(--clr-neon-soft);
      box-shadow: var(--shadow-panel), 0 0 1.5rem hsl(187 62% 58% / 0.18);
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  padding: var(--space-8) var(--space-3) var(--space-3);
  background: linear-gradient(to top, hsl(200 40% 4% / 0.95) 55%, transparent);
  opacity: 0;
  transition: opacity 0.25s ease;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--clr-text);
    font-size: 0.85rem;
    line-height: 1.45;
  }
`;

export const PosterLink = styled(Link)`
  position: relative;
  display: block;
  aspect-ratio: 2 / 3;
  background: var(--clr-surface-raised);
  text-decoration: none;
  overflow: hidden;

  @media (hover: hover) {
    &:hover ${Overlay}, &:focus-visible ${Overlay} {
      opacity: 1;
    }
  }
`;

export const Poster = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Fallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: var(--space-4);
  background: radial-gradient(
      circle at 30% 20%,
      hsl(187 62% 58% / 0.25),
      transparent 60%
    ),
    linear-gradient(160deg, #00192d, #164642);
  color: var(--clr-text);
  font: 700 1.4rem/1.1 var(--font-display);
  text-align: center;
  text-transform: uppercase;
`;

export const Rating = styled.span`
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  padding: 0.1rem 0.5rem;
  border-radius: var(--radius-pill);
  background: var(--clr-neon);
  box-shadow: var(--glow-neon);
  color: var(--clr-on-neon);
  font-size: 0.8rem;
  font-weight: 600;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: var(--space-3);
`;

export const Title = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  font: 700 1.15rem/1.15 var(--font-display);
  letter-spacing: 0.01em;
`;

export const Meta = styled.p`
  margin-top: var(--space-1);
  color: var(--clr-text-muted);
  font-size: 0.8rem;
`;

export const Actions = styled.div`
  display: flex;
  gap: var(--space-1);
  margin-top: auto;
  padding-top: var(--space-2);
`;

export const Action = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: var(--radius-pill);
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    color: var(--clr-text-muted);
  }

  &:hover {
    background-color: var(--clr-neon-faint);

    svg {
      color: var(--clr-neon);
    }
  }
`;
