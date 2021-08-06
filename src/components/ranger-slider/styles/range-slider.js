import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
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
  background-color: #222;
  width: 100%;
  z-index: 1;
`;

export const SliderRange = styled.div`
  border-radius: 3px;
  height: 5px;
  position: absolute;
  background-color: var(--clr-neon);
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

  @media screen and (max-width: 400px) {
    width: 15rem;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 12px;
    width: 12px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
  &::-moz-range-thumb {
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 12px;
    width: 12px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
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
  /* top: -1.5rem;
  left: 50%;
  transform: translateX(-50%); */
  display: flex;
  text-align: center;
  justify-content: center;

  p {
    padding: 0 0.4rem;
    align-self: flex-end;
  }
`;

export const SliderVal = styled.output`
  color: #dee2e6;
  font-size: 1rem;
  position: relative;
  display: inline-block;
  background: #222;
  color: var(--clr-neon);
  padding: 4px 10px;
  border-radius: 5px;
`;

export const SliderMinVal = styled(SliderVal)`
  /* left: 3px; */
`;

export const SliderMaxVal = styled(SliderVal)`
  /* right: -1px; */
`;

export const SliderValSplit = styled.div`
  background-color: white;
  height: 3px;
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
  background-color: gray;
  border-radius: 50%;
  color: ${(props) => (props.highlight ? "var(--clr-neon)" : "#ddd")};
  cursor: pointer;

  &::after {
    position: absolute;
    top: 25px;
    font-size: ${(props) => (props.highlight ? "15px" : "14px")};
    content: "${(props) => (props.labelText ? props.labelText : "")}";
    color: ${(props) => (props.highlight ? "var(--clr-neon)" : "#ddd")};
    transform: translateX(-35%);
    transition: font-size 0.3s;
    transition: color 0.3s;

    @media screen and (max-width: 400px) {
      font-size: ${(props) => (props.highlight ? "11px" : "10px")};
    }
  }
`;
