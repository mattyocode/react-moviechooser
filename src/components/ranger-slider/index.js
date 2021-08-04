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

export default function RangeSlider({
  stepValues,
  defaultMin,
  defaultMax,
  onChange,
  dataTestId = "",
}) {
  const defaultMinIdx = stepValues.indexOf(defaultMin);
  const defaultMaxIdx = stepValues.indexOf(defaultMax);

  const [minValue, setMinValue] = useState(defaultMinIdx);
  const [maxValue, setMaxValue] = useState(defaultMaxIdx);

  const minValRef = useRef(defaultMinIdx);
  const maxValRef = useRef(defaultMaxIdx);
  const trackRef = useRef(null);
  const rangeRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  const minBubbleRef = useRef(null);
  const maxBubbleRef = useRef(null);

  const selectAll = () => {
    setMinValue(stepValues[0]);
    setMaxValue(stepValues[stepValues.length - 1]);
  };

  const getSelectionPercent = useCallback(
    (value) => {
      return Math.round((value / (stepValues.length - 1)) * 100);
    },
    [stepValues]
  );

  const getBubbleLeftPosition = useCallback((pos, offset) => {
    const bubbleWidth = Math.round(
      minBubbleRef.current.getBoundingClientRect().width
    );
    const trackWidth = Math.round(
      trackRef.current.getBoundingClientRect().width
    );

    const bubblePosition = pos * (trackWidth / 100) - bubbleWidth / 2;
    return bubblePosition + (8 - bubblePosition * offset);
  }, []);

  useEffect(() => {
    const minPercent = getSelectionPercent(minValue);
    const maxPercent = getSelectionPercent(maxValRef.current);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;

      minBubbleRef.current.style.left = `${getBubbleLeftPosition(
        minPercent,
        0.1
      )}px`;
    }
  }, [minValue, getSelectionPercent, getBubbleLeftPosition]);

  useEffect(() => {
    const minPercent = getSelectionPercent(minValRef.current);
    const maxPercent = getSelectionPercent(maxValue);

    if (rangeRef.current) {
      maxBubbleRef.current.style.left = `${getBubbleLeftPosition(
        maxPercent,
        0.05
      )}px`;

      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxValue, getSelectionPercent, getBubbleLeftPosition]);

  useEffect(() => {
    onChange({ min: stepValues[minValue], max: stepValues[maxValue] });
  }, [stepValues, minValue, maxValue, onChange]);

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
          setMinValue(value);
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
          setMaxValue(value);
          maxValRef.current = value;
        }}
        ref={maxThumbRef}
      />
      <Slider>
        <MinBubble data-testid={`${dataTestId}-min-val`} ref={minBubbleRef}>
          {stepValues[minValue]}
        </MinBubble>
        <MaxBubble data-testid={`${dataTestId}-max-val`} ref={maxBubbleRef}>
          {stepValues[maxValue]}
        </MaxBubble>
        <TrackWrapper>
          <RangeLabels>
            {stepValues.map((value, index) => {
              return <RangeLabel key={index} labelText={value}></RangeLabel>;
            })}
          </RangeLabels>
          <SliderTrack ref={trackRef} />
          <SliderRange ref={rangeRef} />
        </TrackWrapper>
      </Slider>
    </Wrapper>
  );
}
