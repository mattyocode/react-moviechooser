import React from "react";

import {
  Container,
  Error,
  Base,
  Filters,
  Panel,
  SubmitPanel,
  Hint,
  Heading,
  AllButton,
  TextLabel,
  TextInput,
  Chips,
  Chip,
  SubmitWrapper,
  SubmitBtn,
} from "./styles/choice-form";

export default function ChoiceForm({ children, ...restProps }) {
  return (
    <Container data-testid="choice-form" {...restProps}>
      {children}
    </Container>
  );
}

ChoiceForm.Error = function ChoiceFormError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

ChoiceForm.Base = function ChoiceFormBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

ChoiceForm.Filters = function ChoiceFormFilters({ children, ...restProps }) {
  return <Filters {...restProps}>{children}</Filters>;
};

ChoiceForm.Panel = function ChoiceFormPanel({ children, ...restProps }) {
  return <Panel {...restProps}>{children}</Panel>;
};

ChoiceForm.SubmitPanel = function ChoiceFormSubmitPanel({
  children,
  ...restProps
}) {
  return <SubmitPanel {...restProps}>{children}</SubmitPanel>;
};

ChoiceForm.Hint = function ChoiceFormHint({ children, ...restProps }) {
  return <Hint {...restProps}>{children}</Hint>;
};

ChoiceForm.Heading = function ChoiceFormHeading({ children, ...restProps }) {
  return <Heading {...restProps}>{children}</Heading>;
};

ChoiceForm.AllButton = function ChoiceFormAllButton({
  children,
  ...restProps
}) {
  return <AllButton {...restProps}>{children}</AllButton>;
};

// Free-text search: a box plus example queries that search as soon as they're
// clicked. The hint tells users the filters below still narrow the search.
ChoiceForm.TextSearch = function ChoiceFormTextSearch({
  value,
  onChange,
  maxLength,
  examples,
  onExampleClick,
  ...restProps
}) {
  return (
    <Panel {...restProps}>
      <TextLabel htmlFor="mood-text">
        Describe what you're in the mood for
      </TextLabel>
      <TextInput
        id="mood-text"
        data-testid="mood-text"
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        placeholder="e.g. a twisty heist with a great soundtrack"
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value.slice(0, maxLength))}
      />
      <Chips>
        {examples.map((example) => (
          <Chip
            key={example}
            type="button"
            data-testid="example-chip"
            onClick={() => onExampleClick(example)}
          >
            {example}
          </Chip>
        ))}
      </Chips>
      <Hint data-testid="text-search-hint">
        Tap one to search now, or narrow it with genre, decade and runtime
        below.
      </Hint>
    </Panel>
  );
};

ChoiceForm.Submit = function ChoiceFormSubmit({ children, ...restProps }) {
  return (
    <SubmitWrapper data-testid="submit-btns" {...restProps}>
      {children}
    </SubmitWrapper>
  );
};

ChoiceForm.SubmitBtn = function ChoiceFormSubmitBtn({
  children,
  ...restProps
}) {
  return <SubmitBtn {...restProps}>{children}</SubmitBtn>;
};
