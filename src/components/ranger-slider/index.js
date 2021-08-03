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
  defaultMinIdx,
  defaultMaxIdx,
  onChange,
}) {
  // const min = stepValues[0];
  // const max = stepValues[stepValues.length];
  const [minValue, setminValue] = useState(defaultMinIdx);
  const [maxValue, setmaxValue] = useState(defaultMaxIdx);

  const minValRef = useRef(defaultMinIdx);
  const maxValRef = useRef(defaultMaxIdx);
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

      console.log("minPercent >>", minPercent);
      console.log("maxPercent >>", maxPercent);

      const bubbleWidth = Math.round(
        minBubbleRef.current.getBoundingClientRect().width
      );
      const trackWidth = Math.round(
        trackRef.current.getBoundingClientRect().width
      );

      const getBubblePosition = () => {
        const bubblePosition =
          minPercent * (trackWidth / 100) - bubbleWidth / 2;
        return bubblePosition;
      };

      minBubbleRef.current.style.left = `calc(${getBubblePosition()}px + (${
        8 - getBubblePosition() * 0.1
      }px))`;
    }
  }, [minValue, getSelectionPercent]);

  useEffect(() => {
    const minPercent = getSelectionPercent(minValRef.current);
    const maxPercent = getSelectionPercent(maxValue);

    if (rangeRef.current) {
      const bubbleWidth = Math.round(
        minBubbleRef.current.getBoundingClientRect().width
      );
      const trackWidth = Math.round(
        trackRef.current.getBoundingClientRect().width
      );

      console.log("minPercent >>", minPercent);
      console.log("maxPercent >>", maxPercent);

      const getBubblePosition = () => {
        const bubblePosition =
          maxPercent * (trackWidth / 100) - bubbleWidth / 2;
        return bubblePosition;
      };

      maxBubbleRef.current.style.left = `calc(${getBubblePosition()}px + (${
        8 - getBubblePosition() * 0.05
      }px))`;

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
        <MinBubble data-testid="runtime-min-val" ref={minBubbleRef}>
          {stepValues[minValue]}
        </MinBubble>
        <MaxBubble ref={maxBubbleRef}>{stepValues[maxValue]}</MaxBubble>
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
