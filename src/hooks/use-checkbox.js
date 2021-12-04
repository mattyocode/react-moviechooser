import { useState, useEffect, useCallback } from "react";

export default function useCheckbox(options = []) {
  const [isChecked, setIsChecked] = useState(
    new Array(options.length).fill(false)
  );
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
    setIsChecked(new Array(options.length).fill(false));
  }, [options]);

  return {
    isChecked,
    checkboxChangeHandler,
    allBtnHandler,
    allBtnHighlighted,
  };
}
