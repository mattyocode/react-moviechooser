import styled from "styled-components";

export const Options = styled.ul`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// Unselected chips are quiet; the neon glow is reserved for what's switched on.
export const Label = styled.label`
  display: inline-block;
  white-space: nowrap;
  margin: var(--space-1);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-pill);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s,
    box-shadow 0.2s;

  color: ${(props) =>
    props.checked ? "var(--clr-on-neon)" : "var(--clr-text-muted)"};
  background-color: ${(props) =>
    props.checked ? "var(--clr-neon)" : "transparent"};
  border: 1px solid
    ${(props) => (props.checked ? "var(--clr-neon)" : "var(--clr-neon-soft)")};
  box-shadow: ${(props) =>
    props.checked
      ? "0 0 0.9rem hsl(187 62% 58% / 0.55), 0 0 0.2rem var(--clr-neon)"
      : "none"};

  &:hover {
    color: ${(props) =>
      props.checked ? "var(--clr-on-neon)" : "var(--clr-neon)"};
    border-color: var(--clr-neon);
  }

  @media screen and (max-width: 400px) {
    font-size: 0.85rem;
    padding: 0.35rem 0.75rem;
  }
`;

// Visually hidden but still focusable, so the genres can be toggled from the keyboard.
export const Input = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:focus-visible + label {
    outline: 2px solid var(--clr-text);
    outline-offset: 2px;
  }
`;
