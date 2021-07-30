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

ChoiceForm.Label = function ChoiceFormLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};

ChoiceForm.Input = function ChoiceFormInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};
