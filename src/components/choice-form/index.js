import React from "react";

import {
  Container,
  Base,
  Panel,
  Title,
  AllButton,
  ChoiceList,
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
