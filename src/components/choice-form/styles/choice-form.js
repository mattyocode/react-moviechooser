import styled from "styled-components";

export const Container = styled.div`
  max-width: 780px;
  margin: 0 auto;
  padding: 1rem;

  @media screen and (min-width: 800px) {
    padding-top: 1.5rem;
  }
`;

export const Base = styled.form``;

export const Panel = styled.div`
  position: relative; /* may cause issues */
  border-radius: 5px;
  background: rgba(34, 34, 34, 0.5);
  width: 100%;
  padding: 0.5rem;
  margin: 20px 0;
  text-align: center;
`;

export const Title = styled.h2``;

export const AllButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: none;
  background-color: inherit;
  padding-left: 0.5rem;
  color: var(--clr-neon);
  font-size: 1rem;
  text-shadow: 0 0 0.1em hsl(0 0% 100% / 0.3), 0 0 0.1em currentColor;
  cursor: pointer;
  text-decoration: underline;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
`;

export const Options = styled.ul`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Label = styled.label`
  display: inline-block;
  background-color: #222;
  border-radius: 25px;
  white-space: nowrap;
  margin: 0.4rem 0.25rem;
  padding: 5px 10px 5px 10px;
  color: var(--clr-neon);
  border: 2px solid var(--clr-neon);
  border-radius: 10px;
  box-shadow: inset 0 0 0.25em 0 var(--clr-neon), 0 0 0.25em 0 var(--clr-neon);
  cursor: pointer;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
  }
`;

export const Input = styled.input.attrs({ type: "checkbox" })`
  background-color: #225269;
  display: none;
  /* display: absolute;
  position: absolute;
  opacity: 0; */

  &:checked + label {
    border: 2px solid #1bdbf8;
    background-color: #12bbd4;
    color: #222;
    transition: all 0.2s;
  }
`;
