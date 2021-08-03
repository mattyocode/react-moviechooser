import styled from "styled-components/macro";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;

export const Slider = styled.div`
  position: relative;
  width: 20rem;
  padding: 2rem 0;
  height: 100%;
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

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
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
    height: 18px;
    width: 18px;
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

const SliderVal = styled.div`
  color: #dee2e6;
  font-size: 12px;
  margin-top: 20px;
  position: absolute;
`;

export const SliderMinVal = styled(SliderVal)`
  left: 3px;
`;

export const SliderMaxVal = styled(SliderVal)`
  right: -1px;
`;

const Bubble = styled.output`
  position: absolute;
  background: #222;
  color: white;
  padding: 4px 10px;
  border-radius: 5px;
  top: 0;

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 2px;
    background: #222; */
    /* top: 0px; */
    /* left: 50%; */
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
  /* position: relative;
  width: calc(100% / 7);
  color: #b2b2b2;
  font-size: 14px;
  cursor: pointer; */

  &::after {
    position: absolute;
    top: 25px;
    font-size: 11px;
    color: #ddd;
    content: "1";
  }
`;
