import styled from "styled-components";

export const Options = styled.ul`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Label = styled.label`
  display: inline-block;
  border-radius: 25px;
  white-space: nowrap;
  margin: 0.4rem 0.25rem;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
  box-shadow: inset 0 0 0.25em 0 var(--clr-neon), 0 0 0.25em 0 var(--clr-neon);
  cursor: pointer;

  @media screen and (max-width: 400px) {
    font-size: 0.85rem;
    margin: 0.3rem 0.25rem;
  }

  color: ${(props) => (props.checked ? "#222" : "var(--clr-neon)")};
  background-color: ${(props) =>
    props.checked ? "var(--clr-neon)" : "transparent"};
  border: ${(props) =>
    props.checked ? "2px solid #1bdbf8" : "2px solid var(--clr-neon)"};
  transition: all 0.2s;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
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
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;
