import React, { useState, useRef, useCallback, useEffect } from "react";

import {
  Wrapper,
  Slider,
  SliderTrack,
  SliderRange,
  TrackWrapper,
  ThumbMin,
  ThumbMax,
  MinBubble,
  MaxBubble,
  RangeLabels,
  RangeLabel,
} from "./styles/range-slider";

export default function RangeSlider({ stepValues, onChange }) {
  const min = stepValues[0];
  const max = stepValues[stepValues.length];
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(stepValues.length - 1);

  const minValRef = useRef(0);
  const maxValRef = useRef(stepValues.length - 1);
  const trackRef = useRef(null);
  const rangeRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const minBubbleRef = useRef(null);
  const maxBubbleRef = useRef(null);

  const getSelectionPercent = useCallback(
    (value) => {
      return Math.round((value / (stepValues.length - 1)) * 100);
    },
    [stepValues]
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
        max={stepValues.length - 1}
        value={minValue}
        steps="1"
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxValue - 1);
          setminValue(value);
          minValRef.current = value;
        }}
        ref={minThumbRef}
      />
      <ThumbMax
        type="range"
        min="0"
        max={stepValues.length - 1}
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
        {/* <SliderMinVal>{stepValues[minValue]}</SliderMinVal>
        <SliderMaxVal>{stepValues[maxValue]}</SliderMaxVal> */}

        <TrackWrapper>
          <RangeLabels>
            {stepValues.map((value) => {
              return <RangeLabel labelText={value}></RangeLabel>;
            })}
          </RangeLabels>
          <SliderTrack ref={trackRef} />
          <SliderRange ref={rangeRef} />
        </TrackWrapper>
      </Slider>
    </Wrapper>
  );
}
