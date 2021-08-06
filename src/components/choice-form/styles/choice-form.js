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
  padding: 1rem;
  margin: 20px 0;
  text-align: center;

  &:first-child {
    margin-top: 0 !important;
  }
`;

export const Heading = styled.div`
  position: relative;
  padding-bottom: 0.5rem;
`;

export const Title = styled.h2``;

export const AllButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  background-color: transparent;
  padding-left: 0.5rem;
  color: ${(props) => (props.highlighted ? "var(--clr-neon)" : "#aaa")};
  font-size: 0.8rem;
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
    font-size: 0.75rem;
  }
`;

export const Options = styled.ul`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 9.5rem;
  overflow-y: auto;
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
    font-size: 0.75rem;
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

export const Input = styled.input.attrs({ type: "checkbox" })`
  display: none;
  cursor: pointer;
  }
`;

export const SubmitWrapper = styled.div`
  max-width: 350px;
  display: flex;
  margin: 0 auto;
  justify-content: space-evenly;
`;

export const SubmitBtn = styled.button`
  max-width: 25rem;
  margin: 0 auto;
  padding: 0 5px;
  width: 8rem;
  height: 3rem;
  border-radius: 5px;
  border-style: hidden;
  background-image: linear-gradient(90deg, #51c7d6, #59d7b3 50%, #e3dc44);
  cursor: pointer;
  text-align: center;
  justify-content: center;
  color: #222;
  font-size: 1rem;
  font-weight: bold;

  @media screen and (max-width: 400px) {
    font-size: 0.8rem;
    width: 7rem;
  }
`;
