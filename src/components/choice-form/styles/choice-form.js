import styled from "styled-components/macro";

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
  background: rgba(34, 34, 34, 0.3);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 100%;
  padding: 1rem 1rem 1.5rem 1rem;
  margin: 20px 0;
  text-align: center;
`;

export const Heading = styled.div`
  position: relative;
  padding: 0.5rem 0;
`;

export const Title = styled.h2``;

export const AllButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  border: none;
  background-color: transparent;
  padding-left: 0.5rem;
  color: ${(props) => (props.highlighted ? "var(--clr-neon)" : "#aaa")};
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

  @media screen and (max-width: 800px) {
    top: 0.5rem;
    left: 0.5rem;
  }
`;

export const Options = styled.ul`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 9.5rem;
  overflow-y: scroll;
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

export const Input = styled.input.attrs({ type: "checkbox" })`
  display: none;
  cursor: pointer;
  }
`;
