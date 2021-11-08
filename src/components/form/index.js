import React from "react";
import {
  Wrapper,
  Base,
  Header,
  HeaderIcon,
  Title,
  Text,
  Error,
  Input,
  SubmitBtn,
} from "./styles/form";

export default function Form({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
}

Form.Base = function FormBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

Form.Header = function FormHeader({ keyword, title, children, ...restProps }) {
  return (
    <Header {...restProps}>
      <HeaderIcon>{children}</HeaderIcon>
      <Title>
        <span>{keyword} </span>
        {title}
      </Title>
    </Header>
  );
};

Form.Text = function FormText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Form.Error = function FormError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

Form.Input = function FormInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
  return <SubmitBtn {...restProps}>{children}</SubmitBtn>;
};
