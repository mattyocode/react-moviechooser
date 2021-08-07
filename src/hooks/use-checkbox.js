import React, { useState, useEffect } from "react";

export default function useCheckbox(options = []) {
  const [isChecked, setIsChecked] = useState(
    new Array(options.length).fill(false)
  );
  const [allBtnHighlighted, setAllBtnHighlighted] = useState(true);

  const checkboxChangeHandler = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedCheckedState);
  };

  const allBtnHandler = (event) => {
    event.preventDefault();
    if (isChecked.includes(false)) {
      setIsChecked(new Array(options.length).fill(true));
    } else {
      setIsChecked(new Array(options.length).fill(false));
    }
  };

  useEffect(() => {
    if (isChecked.includes(false)) {
      setAllBtnHighlighted(true);
    } else {
      setAllBtnHighlighted(false);
    }
  }, [isChecked]);

  return {
    isChecked,
    checkboxChangeHandler,
    allBtnHandler,
    allBtnHighlighted,
  };
}
