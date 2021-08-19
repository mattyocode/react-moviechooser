import { useReducer, useEffect, useCallback } from "react";

const sliderStateReducer = (state, action) => {
  switch (action.type) {
    case "SET-MIN": {
      return { ...state, minValue: action.value };
    }
    case "SET-MAX": {
      return { ...state, maxValue: action.value };
    }
    case "SET-PREV": {
      return { ...state, prevMin: action.min, prevMax: action.max };
    }
    case "ALL-SELECTED": {
      return { ...state, allSelected: action.value };
    }
    case "SET-LABELS": {
      return { ...state, rangeLabels: action.value };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

export default function useSlider(
  stepsArray = [],
  defaultMin = 0,
  defaultMax = 0
) {
  const [state, dispatch] = useReducer(sliderStateReducer, {
    rangeLabels: stepsArray,
    minValue: stepsArray.indexOf(defaultMin) || null,
    maxValue: stepsArray.indexOf(defaultMax) || null,
    prevMin: null,
    prevMax: null,
    allSelected: false,
  });

  // console.log("use-slider");

  const setMin = (value) => {
    dispatch({ type: "SET-MIN", value: value });
  };
  const setMax = (value) => {
    dispatch({ type: "SET-MAX", value: value });
  };

  const setLabels = (value) => {
    dispatch({ type: "SET-LABELS", value: value });
  };

  const allBtnHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (
        state.minValue !== 0 ||
        state.maxValue !== state.rangeLabels.length - 1
      ) {
        dispatch({
          type: "SET-PREV",
          min: state.minValue,
          max: state.maxValue,
        });
        setMin(0);
        setMax(state.rangeLabels.length - 1);
      } else {
        setMin(state.prevMin);
        setMax(state.prevMax);
      }
    },
    [state]
  );

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

  useEffect(() => {
    // console.log("use-slider useEffect");

    setMin(stepsArray.indexOf(defaultMin));
    setMax(stepsArray.indexOf(defaultMax));
    setLabels(stepsArray);
  }, [stepsArray, defaultMin, defaultMax]);

  return {
    state,
    setMin,
    setMax,
    allBtnHandler,
  };
}
