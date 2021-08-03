import React, { useState, useRef, useCallback, useEffect } from "react";

import {
  Wrapper,
  Slider,
  SliderTrack,
  SliderRange,
  TrackWrapper,
  ThumbMin,
  ThumbMax,
  SliderMinVal,
  SliderMaxVal,
  MinBubble,
  MaxBubble,
  RangeLabels,
  RangeLabel,
} from "./styles/range-slider";

export default function RangeSlider({ onChange }) {
  const valueSteps = ["Short", 75, 90, 105, 120, 150, 180];
  const min = valueSteps[0];
  const max = valueSteps[valueSteps.length];
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(valueSteps.length - 1);

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const trackRef = useRef(null);
  const rangeRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const minBubbleRef = useRef(null);
  const maxBubbleRef = useRef(null);

  const getSelectionPercent = useCallback(
    (value) => {
      return Math.round(((value - min) / (max - min)) * 100);
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
        min="0"
        max={valueSteps.length - 1}
        value={minValue}
        steps="1"
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxValue - 1);
          console.log(event.target.value);
          setminValue(value);
          minValRef.current = value;
        }}
        ref={minThumbRef}
      />
      <ThumbMax
        type="range"
        min="0"
        max={valueSteps.length - 1}
        steps="1"
        value={maxValue}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minValue + 1);
          setmaxValue(value);
          maxValRef.current = value;
        }}
        ref={maxThumbRef}
      />
      <Slider>
        {/* <MinBubble data-testid="runtime-min-val" ref={minBubbleRef}>
          {minValue}
        </MinBubble>
        <MaxBubble ref={maxBubbleRef}>{maxValue}</MaxBubble> */}
        <SliderMinVal>{valueSteps[minValue]}</SliderMinVal>
        <SliderMaxVal>{valueSteps[maxValue]}</SliderMaxVal>

        <TrackWrapper>
          <RangeLabels>
            <RangeLabel></RangeLabel>
            <RangeLabel></RangeLabel>
            <RangeLabel></RangeLabel>
            <RangeLabel></RangeLabel>
            <RangeLabel></RangeLabel>
            <RangeLabel></RangeLabel>
            <RangeLabel></RangeLabel>
          </RangeLabels>
          <SliderTrack ref={trackRef} />
          <SliderRange ref={rangeRef} />
        </TrackWrapper>
      </Slider>
    </Wrapper>
  );
}
