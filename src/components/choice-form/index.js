import React from "react";

import {
  Container,
  Base,
  Panel,
  Title,
  AllButton,
  Options,
  Label,
  Input,
} from "./styles/choice-form";

export default function ChoiceForm({ children, ...restProps }) {
  return (
    <Container data-testid="choice-form" {...restProps}>
      {children}
    </Container>
  );
}

// add .Error

ChoiceForm.Base = function ChoiceFormBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

ChoiceForm.Panel = function ChoiceFormPanel({ children, ...restProps }) {
  return <Panel {...restProps}>{children}</Panel>;
};

ChoiceForm.Title = function ChoiceFormTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

ChoiceForm.AllButton = function ChoiceFormAllButton({
  children,
  ...restProps
}) {
  return <AllButton {...restProps}>{children}</AllButton>;
};

ChoiceForm.Options = function ChoiceFormOptions({ children, ...restProps }) {
  return <Options {...restProps}>{children}</Options>;
};

ChoiceForm.Checkbox = function ChoiceFormCheckbox({
  name,
  index,
  checkedState,
  changeHandler,
  children,
  ...restProps
}) {
  return (
    <li>
      <Input
        id={`genre-checkbox-${index}`}
        value={name}
        checked={checkedState}
        onChange={() => changeHandler(index)}
      />
      <Label
        data-testid="genre-checkbox"
        htmlFor={`genre-checkbox-${index}`}
        checked={checkedState}
        {...restProps}
      >
        {children}
      </Label>
    </li>
  );
};
