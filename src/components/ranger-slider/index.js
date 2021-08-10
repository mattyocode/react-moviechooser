import React, { useRef, useCallback, useEffect } from "react";

import {
  Wrapper,
  Slider,
  SliderTrack,
  SliderRange,
  SliderValWrapper,
  SliderVal,
  SliderMinVal,
  SliderMaxVal,
  TrackWrapper,
  ThumbMin,
  ThumbMax,
  MinBubble,
  MaxBubble,
  RangeLabels,
  RangeLabel,
} from "./styles/range-slider";

export default function RangeSlider({
  minValue,
  maxValue,
  updateMin,
  updateMax,
  stepValues,
  dataTestId = "",
  bubbleValues = false,
}) {
  const minValRef = useRef(minValue);
  const maxValRef = useRef(maxValue);
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

  const setToSingleDecade = useCallback(
    (index) => {
      updateMin(index);
      updateMax(index);
    },
    [updateMin, updateMax]
  );

  useEffect(() => {
    const minPercent = getSelectionPercent(minValue);
    const maxPercent = getSelectionPercent(maxValue);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;

      if (bubbleValues) {
        minBubbleRef.current.style.left = `${getBubbleLeftPosition(
          minPercent,
          0.1
        )}px`;
        maxBubbleRef.current.style.left = `${getBubbleLeftPosition(
          maxPercent,
          0.05
        )}px`;
      }
    }
  }, [
    minValue,
    maxValue,
    getSelectionPercent,
    bubbleValues,
    getBubbleLeftPosition,
  ]);

  useEffect(() => {
    if (minValue === stepValues.length - 1) {
      minThumbRef.current.style.zIndex = "4";
      maxThumbRef.current.style.zIndex = "3";
    } else if (maxValue === 0) {
      minThumbRef.current.style.zIndex = "3";
      maxThumbRef.current.style.zIndex = "4";
    }
  }, [minValue, maxValue, stepValues.length]);

  let sliderValues;
  if (minValue !== maxValue) {
    sliderValues = (
      <>
        <SliderMinVal data-testid={`${dataTestId}-min-val`}>
          {stepValues[minValue]}
        </SliderMinVal>
        <p>...</p>
        <SliderMaxVal data-testid={`${dataTestId}-max-val`}>
          {stepValues[maxValue]}
        </SliderMaxVal>
      </>
    );
  } else {
    sliderValues = (
      <SliderVal data-testid={`${dataTestId}-val`}>
        {stepValues[minValue]}
      </SliderVal>
    );
  }

  const bubbles = (
    <>
      <MinBubble data-testid={`${dataTestId}-min-val`} ref={minBubbleRef}>
        {stepValues[minValue]}
      </MinBubble>
      <MaxBubble data-testid={`${dataTestId}-max-val`} ref={maxBubbleRef}>
        {stepValues[maxValue]}
      </MaxBubble>
    </>
  );

  // refactor to use curried functions ?
  const handleThumbMinChange = (event) => {
    const value = Number(event.target.value);
    if (value > maxValue) {
      updateMin(value);
      updateMax(value);
      minValRef.current = maxValue;
    } else {
      updateMin(value);
      minValRef.current = value;
    }
  };

  const handleThumbMaxChange = (event) => {
    const value = Number(event.target.value);
    if (value < minValue) {
      updateMax(value);
      updateMin(value);
      maxValRef.current = minValue;
    } else {
      updateMax(value);
      maxValRef.current = value;
    }
  };

  return (
    <>
      {!bubbleValues ? (
        <SliderValWrapper>{sliderValues}</SliderValWrapper>
      ) : null}
      <Wrapper data-testid={`${dataTestId}-range-slider`}>
        <ThumbMin
          type="range"
          min="0"
          max={stepValues.length - 1}
          value={minValue}
          steps="1"
          onChange={handleThumbMinChange}
          ref={minThumbRef}
          data-testid={`${dataTestId}-thumb-min`}
        />
        <ThumbMax
          type="range"
          min="0"
          max={stepValues.length - 1}
          steps="1"
          value={maxValue}
          onChange={handleThumbMaxChange}
          ref={maxThumbRef}
          data-testid={`${dataTestId}-thumb-max`}
        />
        <Slider>
          {bubbleValues ? bubbles : null}

          <TrackWrapper>
            <RangeLabels>
              {stepValues.map((value, index) => {
                return (
                  <RangeLabel
                    key={index}
                    labelText={value}
                    highlight={index === minValue || index === maxValue}
                    onClick={() => {
                      setToSingleDecade(index);
                    }}
                    data-testid={`slider-label-${value}`}
                  ></RangeLabel>
                );
              })}
            </RangeLabels>
            <SliderTrack ref={trackRef} />
            <SliderRange ref={rangeRef} />
          </TrackWrapper>
        </Slider>
      </Wrapper>
    </>
  );
}
