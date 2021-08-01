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
    <li key={index}>
      <Label data-testid="genre-checkbox" {...restProps} htmlFor={index}>
        <Input
          id={`genre-checkbox-${index}`}
          value={name}
          checked={checkedState}
          onChange={changeHandler}
        />
        {children}
      </Label>
    </li>
  );
};

ChoiceForm.Label = function ChoiceFormLabel({ children, ...restProps }) {
  return (
    <Label data-testid="genre-checkbox" {...restProps}>
      {children}
    </Label>
  );
};

ChoiceForm.Input = function ChoiceFormInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};
