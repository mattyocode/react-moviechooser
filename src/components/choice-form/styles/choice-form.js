import styled from "styled-components";

export const Container = styled.div`
  max-width: 780px;
  margin: 0 auto;
  padding: var(--space-4);
  scroll-margin-top: 5rem;

  @media screen and (min-width: 800px) {
    padding-top: var(--space-6);
  }
`;

export const Base = styled.form``;

// One frosted card holding every filter section.
export const Filters = styled.div`
  border: 1px solid var(--clr-border);
  border-radius: var(--radius-lg);
  background: var(--clr-surface);
  backdrop-filter: var(--blur-panel);
  -webkit-backdrop-filter: var(--blur-panel);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
`;

export const Panel = styled.section`
  position: relative;
  width: 100%;
  padding: var(--space-6) var(--space-4) var(--space-4);
  text-align: center;

  & + & {
    border-top: 1px solid var(--clr-border);
  }

  @media screen and (min-width: 800px) {
    padding: var(--space-8) var(--space-8) var(--space-6);
  }
`;

// On small screens the submit button follows the user down the form.
export const SubmitPanel = styled.div`
  padding: var(--space-6) 0 var(--space-4);
  text-align: center;

  @media screen and (max-width: 800px) {
    position: sticky;
    bottom: 0;
    z-index: 20;
    margin: var(--space-4) calc(-1 * var(--space-4)) 0;
    padding: var(--space-3) var(--space-4);
    border-top: 1px solid var(--clr-border);
    background: hsl(200 35% 6% / 0.8);
    backdrop-filter: var(--blur-panel);
    -webkit-backdrop-filter: var(--blur-panel);
  }
`;

export const Error = styled(Panel)`
  border-radius: var(--radius-lg);
  background: var(--clr-surface);

  & p {
    color: red;
  }
`;

export const Heading = styled.div`
  position: relative;
  padding-bottom: var(--space-3);
`;

export const Title = styled.h2``;

export const Hint = styled.p`
  color: var(--clr-text-dim);
  font-size: 0.85rem;
  margin-top: var(--space-1);
`;

export const AllButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: var(--space-1) var(--space-3);
  border: 1px solid
    ${(props) =>
      props.highlighted ? "var(--clr-neon-soft)" : "var(--clr-border)"};
  border-radius: var(--radius-pill);
  background-color: transparent;
  color: ${(props) =>
    props.highlighted ? "var(--clr-neon)" : "var(--clr-text-muted)"};
  font: 500 0.8rem var(--font-body);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s, border-color 0.2s, background-color 0.2s;

  &:hover {
    background-color: var(--clr-neon-faint);
    border-color: var(--clr-neon);
  }

  @media screen and (max-width: 800px) {
    font-size: 0.75rem;
  }
`;

export const SubmitWrapper = styled.div`
  max-width: 350px;
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
`;

export const SubmitBtn = styled.button`
  margin: 0 auto;
  width: 14rem;
  height: 3.25rem;
  border-radius: var(--radius-pill);
  border-style: hidden;
  background-image: var(--gradient-cta);
  box-shadow: 0 0 1.5rem hsl(170 60% 55% / 0.35);
  cursor: pointer;
  color: var(--clr-on-neon);
  font: 700 1.25rem var(--font-display);
  letter-spacing: 0.06em;
  text-transform: uppercase;

  &:disabled {
    background-image: none;
    background-color: hsl(0 0% 100% / 0.08);
    box-shadow: none;
    color: var(--clr-text-dim);
    cursor: not-allowed;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;
