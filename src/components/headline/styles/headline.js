import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;

  @media screen and (min-width: 800px) {
    padding: 4rem 0 2rem 0;
    margin-top: 3rem;
  }
`;

export const Title = styled.h1``;

export const Subhead = styled.h3`
  text-align: center;
`;

export const DecoratedSubhead = styled.h3`
  overflow: hidden;
  text-align: center;

  & > span {
    position: relative;
    display: inline-block;
  }

  & > span:before,
  & > span:after {
    content: "";
    position: absolute;
    top: 50%;
    border-bottom: #aaa 2px solid;
    width: 25vw;
    margin: 0 20px;
  }

  & > span:before {
    right: 100%;
  }

  & > span:after {
    left: 100%;
  }

  @media screen and (min-width: 450px) {
    & > span:before,
    & > span:after {
      width: 10vw;
    }
  }
`;
