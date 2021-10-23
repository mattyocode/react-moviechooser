import styled, { createGlobalStyle } from "styled-components/macro";

export const LockBody = createGlobalStyle`
  body {
      overflow: hidden;
  }
`;

export const ReleaseBody = createGlobalStyle`
  body {
      overflow: visible;
  }
`;

export const Spinner = styled.div`
  position: ${(props) => (props.small ? "relative" : "fixed")};
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 999;

  :after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background-image: url(/images/misc/spinner.png);
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: -150px;
    margin-left: -75px;
    width: 150px;
    height: 150px;
    ${(props) =>
      props.small &&
      `
        margin-top: -30px;
        margin-left: -15px;
        width: 30px;
        height: 30px;
    `}

    /* margin-top: ${(props) => (props.$small ? "-30px" : "-150px")}
    margin-left: ${(props) => (props.$small ? "-15px" : "-75px")};
    width: ${(props) => (props.$small ? "-30px" : "-150px")};
    height: ${(props) => (props.$small ? "-30px" : "-150px")}; */
    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @-ms-keyframes spin {
    from {
      -ms-transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
    }
  }
  @-moz-keyframes spin {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
