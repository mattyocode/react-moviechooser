import React, { useRef, useCallback, useEffect } from "react";

import {
  Wrapper,
  Slider,
  SliderTrack,
  SliderRange,
  SliderValWrapper,
  SliderValSplit,
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
}) {
  const minValRef = useRef(minValue);
  const maxValRef = useRef(maxValue);
  const trackRef = useRef(null);
  const rangeRef = useRef(null);
  const minThumbRef = useRef(null);
  const maxThumbRef = useRef(null);
  // const minBubbleRef = useRef(null);
  // const maxBubbleRef = useRef(null);

  const getSelectionPercent = useCallback(
    (value) => {
      return Math.round((value / (stepValues.length - 1)) * 100);
    },
    [stepValues]
  );

  // const getBubbleLeftPosition = useCallback((pos, offset) => {
  //   const bubbleWidth = Math.round(
  //     minBubbleRef.current.getBoundingClientRect().width
  //   );
  //   const trackWidth = Math.round(
  //     trackRef.current.getBoundingClientRect().width
  //   );

  //   const bubblePosition = pos * (trackWidth / 100) - bubbleWidth / 2;
  //   return bubblePosition + (8 - bubblePosition * offset);
  // }, []);

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

      // minBubbleRef.current.style.left = `${getBubbleLeftPosition(
      //   minPercent,
      //   0.1
      // )}px`;
      // maxBubbleRef.current.style.left = `${getBubbleLeftPosition(
      //   maxPercent,
      //   0.05
      // )}px`;
    }
  }, [minValue, maxValue, getSelectionPercent]);

  useEffect(() => {
    if (minValue > maxValue) {
      let min = minValue;
      let max = maxValue;
      updateMin(max);
      updateMax(min);
    }
  }, [minValue, maxValue, updateMin, updateMax]);

  useEffect(() => {
    if (minValue === stepValues.length - 1) {
      minThumbRef.current.style.zIndex = "4";
      maxThumbRef.current.style.zIndex = "3";
    } else if (maxValue === 0) {
      minThumbRef.current.style.zIndex = "3";
      maxThumbRef.current.style.zIndex = "4";
    }
  }, [minValue, maxValue, stepValues.length]);

  return (
    <>
      <SliderValWrapper>
        {minValue !== maxValue ? (
          <>
            <SliderMinVal data-testid={`${dataTestId}-min-val`}>
              {stepValues[minValue]}
            </SliderMinVal>
            <p>...</p>
            {/* <SliderValSplit /> */}
            <SliderMaxVal data-testid={`${dataTestId}-max-val`}>
              {stepValues[maxValue]}
            </SliderMaxVal>
          </>
        ) : (
          <SliderVal data-testid={`${dataTestId}-val`}>
            {stepValues[minValue]}
          </SliderVal>
        )}
      </SliderValWrapper>
      <Wrapper data-testid="range-slider">
        <ThumbMin
          type="range"
          min="0"
          max={stepValues.length - 1}
          value={minValue}
          steps="1"
          onChange={(event) => {
            const value = Number(event.target.value);
            updateMin(value);
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
            const value = Number(event.target.value);
            updateMax(value);
            maxValRef.current = value;
          }}
          ref={maxThumbRef}
        />
        <Slider>
          {/* <MinBubble data-testid={`${dataTestId}-min-val`} ref={minBubbleRef}>
            {stepValues[minValue]}
          </MinBubble>
          <MaxBubble data-testid={`${dataTestId}-max-val`} ref={maxBubbleRef}>
            {stepValues[maxValue]}
          </MaxBubble> */}

          <TrackWrapper>
            <RangeLabels>
              {stepValues.map((value, index) => {
                console.log(value, index === minValue || index === maxValue);
                return (
                  <RangeLabel
                    key={index}
                    labelText={value}
                    highlight={index === minValue || index === maxValue}
                    onClick={() => {
                      setToSingleDecade(index);
                    }}
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
