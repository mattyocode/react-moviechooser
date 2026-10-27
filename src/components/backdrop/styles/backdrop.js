import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-position: center 20%;
  background-size: cover;
  filter: blur(40px) saturate(1.3);
  opacity: 0.55;
  transform: scale(1.15);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 85%);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 85%);
  pointer-events: none;
`;
