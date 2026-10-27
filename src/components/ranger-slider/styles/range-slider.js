import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0 3rem 0;
`;

export const Slider = styled.div`
  position: relative;
  width: 20rem;
  /* padding: 2rem 0; */
  height: 100%;

  @media screen and (max-width: 400px) {
    width: 15rem;
  }
`;

export const TrackWrapper = styled.div`
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

export const SliderTrack = styled.div`
  border-radius: 3px;
  height: 5px;
  position: absolute;
  background-color: hsl(0 0% 100% / 0.1);
  width: 100%;
  z-index: 1;
`;

export const SliderRange = styled.div`
  border-radius: 3px;
  height: 5px;
  position: absolute;
  background-color: var(--clr-neon);
  box-shadow: var(--glow-neon);
  z-index: 2;
`;

const Thumb = styled.input`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 20rem;
  outline: none;
  z-index: 6;
  border: none;

  @media screen and (max-width: 400px) {
    width: 15rem;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    background-image: radial-gradient(
      var(--clr-text) 0%,
      var(--clr-text) 22%,
      var(--clr-neon) 24%,
      var(--clr-neon) 45%,
      transparent 47%
    );
    filter: drop-shadow(0 0 4px hsl(187 62% 58% / 0.7));
    border: 0 !important;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    width: 20px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
    transform: scale(1.5);

    @media screen and (min-width: 400px) {
      transform: scale(1.4);
    }
  }

  &::-moz-range-thumb {
    background-image: radial-gradient(
      var(--clr-text) 0%,
      var(--clr-text) 22%,
      var(--clr-neon) 24%,
      var(--clr-neon) 45%,
      transparent 47%
    );
    filter: drop-shadow(0 0 4px hsl(187 62% 58% / 0.7));
    border-radius: 50%;
    border: 0 !important;
    cursor: pointer;
    height: 20px;
    width: 20px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
    transform: scale(1.5);
    @media screen and (min-width: 400px) {
      transform: scale(1.4);
    }
  }
`;

export const ThumbMin = styled(Thumb)`
  z-index: 3;
`;

export const ThumbMax = styled(Thumb)`
  z-index: 4;
`;
export const SliderValWrapper = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  justify-content: center;

  p {
    align-self: flex-end;
    padding: 0.2rem;
  }
`;

export const SliderVal = styled.output`
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  display: inline-block;
  background: var(--clr-neon-faint);
  border: 1px solid var(--clr-neon-soft);
  color: var(--clr-neon);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);

  @media screen and (max-width: 800px) {
    font-size: 1rem;
  }
`;

export const SliderMinVal = styled(SliderVal)`
  /* left: 3px; */
`;

export const SliderMaxVal = styled(SliderVal)`
  /* right: -1px; */
`;

export const SliderValSplit = styled.div`
  background-color: var(--clr-text-dim);
  height: 2px;
  width: 12px;
  margin: auto 5px;
`;

const Bubble = styled.output`
  position: absolute;
  background: #222;
  color: var(--clr-neon);
  padding: 4px 10px;
  border-radius: 5px;
  top: 0;

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 2px;
    background: #222;
  }
`;

export const MinBubble = styled(Bubble)``;

export const MaxBubble = styled(Bubble)``;

export const RangeLabels = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 5;
`;

export const RangeLabel = styled.div`
  height: 5px;
  width: 5px;
  background-color: var(--clr-text-dim);
  border-radius: 50%;
  color: ${(props) =>
    props.highlight ? "var(--clr-neon)" : "var(--clr-text-muted)"};
  cursor: pointer;

  &::after {
    position: absolute;
    top: 25px;
    font-size: ${(props) => (props.highlight ? "15px" : "14px")};
    content: "${(props) => (props.labelText ? props.labelText : "")}";
    color: ${(props) =>
      props.highlight ? "var(--clr-neon)" : "var(--clr-text-muted)"};
    transform: translateX(-35%);
    transition: font-size 0.3s;
    transition: color 0.3s;

    @media screen and (max-width: 400px) {
      font-size: ${(props) => (props.highlight ? "12px" : "11px")};
    }
  }
`;
