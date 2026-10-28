import { useState, useEffect, useCallback, useRef } from "react";

// initialIds: option ids to start checked, e.g. when restoring a previous search.
export default function useCheckbox(options = [], initialIds = []) {
  const initialIdsRef = useRef(initialIds);
  const initialState = (opts) =>
    opts.map((option) => initialIdsRef.current.includes(option.id));

  const [isChecked, setIsChecked] = useState(() => initialState(options));
  const [allBtnHighlighted, setAllBtnHighlighted] = useState(true);

  const checkboxChangeHandler = useCallback(
    (position) => {
      const updatedCheckedState = isChecked.map((item, index) =>
        index === position ? !item : item
      );
      setIsChecked((prevState) => updatedCheckedState);
    },
    [isChecked]
  );

  const allBtnHandler = useCallback(
    (event) => {
      event.preventDefault();
      if (isChecked.includes(false)) {
        setIsChecked(new Array(options.length).fill(true));
      } else {
        setIsChecked(new Array(options.length).fill(false));
      }
    },
    [isChecked, options]
  );

  useEffect(() => {
    if (isChecked.includes(false)) {
      setAllBtnHighlighted(true);
    } else {
      setAllBtnHighlighted(false);
    }
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(initialState(options));
  }, [options]);

  return {
    isChecked,
    checkboxChangeHandler,
    allBtnHandler,
    allBtnHighlighted,
  };
}
