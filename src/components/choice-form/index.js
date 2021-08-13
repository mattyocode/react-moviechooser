import React from "react";

import {
  Container,
  Base,
  Panel,
  Heading,
  AllButton,
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

// add .Error

ChoiceForm.Base = function ChoiceFormBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

ChoiceForm.Panel = function ChoiceFormPanel({ children, ...restProps }) {
  return <Panel {...restProps}>{children}</Panel>;
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
