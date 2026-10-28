import React from "react";

import { Wrapper, Chips, Chip, EditButton } from "./styles/filter-summary";

export default function FilterSummary({ children, ...restProps }) {
  return (
    <Wrapper data-testid="filter-summary" {...restProps}>
      {children}
    </Wrapper>
  );
}

FilterSummary.Chips = function FilterSummaryChips({ labels, ...restProps }) {
  return (
    <Chips aria-label="Current filters" {...restProps}>
      {labels.map((label) => (
        <Chip key={label}>{label}</Chip>
      ))}
    </Chips>
  );
};

FilterSummary.Edit = function FilterSummaryEdit({ children, ...restProps }) {
  return (
    <EditButton type="button" {...restProps}>
      {children}
    </EditButton>
  );
};
