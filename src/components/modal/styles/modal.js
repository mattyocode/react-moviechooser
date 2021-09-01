import styled from "styled-components/macro";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-image: linear-gradient(
    135deg,
    rgb(0, 0, 0),
    rgb(0, 0, 0) 30%,
    rgba(0, 25, 45, 0.9) 65%,
    rgba(22, 70, 66, 0.9) 85%,
    rgba(68, 187, 159, 1) 110%
  );
`;

export const Overlay = styled.div`
  position: fixed;
  top: 20vh;
  left: 5%;
  width: 90%;
  background-color: #191919;
  padding: 1rem;
  border-radius: 5px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25); */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  z-index: 30;
  /* animation: slide-down 300ms ease-out forwards; */
`;
