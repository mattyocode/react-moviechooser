import React, { useState, useEffect } from "react";

export default function useSlider(
  stepsArray = [],
  defaultMin = 0,
  defaultMax = 0
) {
  const defaultMinIdx = stepsArray.indexOf(defaultMin);
  const defaultMaxIdx = stepsArray.indexOf(defaultMax);
  const [minValue, setMinValue] = useState(defaultMinIdx);
  const [maxValue, setMaxValue] = useState(defaultMaxIdx);
  const [allBtnHighlighted, setAllBtnHighlighted] = useState(true);

  const [prevMin, setPrevMin] = useState();
  const [prevMax, setPrevMax] = useState();

  const allBtnHandler = (event) => {
    event.preventDefault();
    if (minValue !== 0 || maxValue !== stepsArray.length - 1) {
      setPrevMin(minValue);
      setPrevMax(maxValue);
      setMinValue(0);
      setMaxValue(stepsArray.length - 1);
    } else {
      setMinValue(prevMin);
      setMaxValue(prevMax);
    }
  };

  useEffect(() => {
    if (minValue === 0 && maxValue === stepsArray.length - 1) {
      setAllBtnHighlighted(false);
    } else {
      setAllBtnHighlighted(true);
    }
  }, [minValue, maxValue, stepsArray]);

  // useEffect(() => {
  //   if (minValue > maxValue) {
  //     let min = minValue;
  //     setMaxValue(min);
  //     setMinValue(maxValue);
  //   }
  // }, [minValue, maxValue]);

  return {
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    allBtnHighlighted,
    allBtnHandler,
  };
}
