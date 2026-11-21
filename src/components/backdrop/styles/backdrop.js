import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 85%);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 85%);
  pointer-events: none;

  & > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
    filter: blur(40px) saturate(1.3);
    opacity: 0.55;
    transform: scale(1.15);
  }
`;
