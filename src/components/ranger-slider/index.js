import React, { useState, useRef, useCallback, useEffect } from "react";

import {
  Wrapper,
  Slider,
  SliderTrack,
  SliderRange,
  ThumbMin,
  ThumbMax,
  SliderMinVal,
  SliderMaxVal,
} from "./styles/range-slider";

export default function RangeSlider({ min, max, onChange }) {
  const [minValue, setminValue] = useState(min);
  const [maxValue, setmaxValue] = useState(max);

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const rangeRef = useRef(null);

  const getSelectionPercent = useCallback(
    (value) => {
      Math.round(((value - min) / (max - min)) * 100);
    },
    [min, max]
  );

  useEffect(() => {
    const minPercent = getSelectionPercent(minValue);
    const maxPercent = getSelectionPercent(maxValRef.current);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, getSelectionPercent]);

  useEffect(() => {
    const minPercent = getSelectionPercent(minValRef.current);
    const maxPercent = getSelectionPercent(maxValue);

    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxValue, getSelectionPercent]);

  useEffect(() => {
    onChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue, onChange]);

  return (
    <Wrapper data-testid="range-slider">
      <ThumbMin
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxValue - 1);
          setminValue(value);
          minValRef.current = value;
        }}
      />
      <ThumbMax
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minValue + 1);
          setmaxValue(value);
          maxValRef.current = value;
        }}
      />
      <Slider>
        <SliderTrack />
        <SliderRange ref={rangeRef} />
      </Slider>
    </Wrapper>
  );
}
