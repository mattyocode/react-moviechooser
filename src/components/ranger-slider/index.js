import React from "react";

import {
  Wrapper,
  Slider,
  SliderTrack,
  SliderRange,
  Thumb,
  SliderMinVal,
  SliderMaxVal,
} from "./styles/range-slider";

export default function RangeSlider(props) {
  return (
    <Wrapper data-testid="range-slider">
      <Thumb type="range" min="0" max="1000" className="thumb thumb-left" />
      <Thumb type="range" min="0" max="1000" className="thumb thumb-right" />
    </Wrapper>
  );
}
