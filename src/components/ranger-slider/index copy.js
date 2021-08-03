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
} from "./styles/range-slider";

export default function RangeSlider({ min, max, onChange }) {
  const [minValue, setminValue] = useState(min);
  const [maxValue, setmaxValue] = useState(max);

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

      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minValue, getSelectionPercent]);

  useEffect(() => {
    const minPercent = getSelectionPercent(minValRef.current);
    const maxPercent = getSelectionPercent(maxValue);

    const bubbleWidth = Math.round(
      minBubbleRef.current.getBoundingClientRect().width
    );
    const trackWidth = Math.round(
      trackRef.current.getBoundingClientRect().width
    );

    const getBubblePosition = () => {
      const bubblePosition = maxPercent * (trackWidth / 100) - bubbleWidth / 2;
      return bubblePosition;
    };

    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      maxBubbleRef.current.style.left = `calc(${getBubblePosition()}px + (${
        8 - getBubblePosition() * 0.05
      }px))`;
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
        ref={minThumbRef}
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
        ref={maxThumbRef}
      />
      <Slider>
        <MinBubble data-testid="runtime-min-val" ref={minBubbleRef}>
          {minValue}
        </MinBubble>
        <MaxBubble ref={maxBubbleRef}>{maxValue}</MaxBubble>
        {/* <SliderMinVal>{minValue}</SliderMinVal>
        <SliderMaxVal>{maxValue}</SliderMaxVal> */}
        <TrackWrapper>
          <SliderTrack ref={trackRef} />
          <SliderRange ref={rangeRef} />
        </TrackWrapper>
      </Slider>
    </Wrapper>
  );
}
