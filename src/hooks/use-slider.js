import { useReducer, useEffect } from "react";

const sliderStateReducer = (state, action) => {
  switch (action.type) {
    case "SET-MIN": {
      return { ...state, minValue: action.value };
    }
    case "SET-MAX": {
      return { ...state, maxValue: action.value };
    }
    case "SET-PREV-MIN": {
      return { ...state, prevMinValue: action.value };
    }
    case "SET-PREV-MAX": {
      return { ...state, prevMaxValue: action.value };
    }
    case "ALL-SELECTED": {
      return { ...state, prevMaxValue: action.value };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

export default function useSlider(
  stepsArray = [],
  defaultMin = "",
  defaultMax = ""
) {
  const [state, dispatch] = useReducer(sliderStateReducer, {
    rangeLabels: stepsArray,
    minValue: stepsArray.indexOf(defaultMin) || null,
    maxValue: stepsArray.indexOf(defaultMax) || null,
    prevMin: null,
    prevMax: null,
    allSelected: false,
  });

  console.log(state);

  const allBtnHandler = (event) => {
    event.preventDefault();
    if (
      state.minValue !== 0 ||
      state.maxValue !== state.rangeLabels.length - 1
    ) {
      dispatch({ type: "SET-PREV-MIN", value: state.minValue });
      dispatch({ type: "SET-PREV-MAX", value: state.maxValue });
      dispatch({ type: "SET-MIN", value: 0 });
      dispatch({ type: "SET-MAX", value: state.rangeLabels.length - 1 });
    } else {
      dispatch({ type: "SET-MIN", value: state.prevMinValue });
      dispatch({ type: "SET-MAX", value: state.prevMaxValue });
    }
  };

  const setMin = (value) => {
    dispatch({ type: "SET-MIN", value: value });
  };
  const setMax = (value) => {
    dispatch({ type: "SET-MAX", value: value });
  };

  useEffect(() => {
    if (
      state.minValue === 0 &&
      state.maxValue === state.rangeLabels.length - 1
    ) {
      dispatch({ type: "ALL-SELECTED", value: true });
    } else {
      dispatch({ type: "ALL-SELECTED", value: false });
    }
  }, [state.minValue, state.maxValue, state.rangeLabels]);

  // useEffect(() => {
  //   if (minValue > maxValue) {
  //     let min = minValue;
  //     setMaxValue(min);
  //     setMinValue(maxValue);
  //   }
  // }, [minValue, maxValue]);

  return {
    state,
    setMin,
    setMax,
    allBtnHandler,
  };
}
