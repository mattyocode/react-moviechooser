import React from "react";
import { NavLink as ReactRouterLink } from "react-router-dom";
import {
  Wrapper,
  Base,
  Header,
  HeaderImg,
  Title,
  Text,
  Link,
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

Form.Header = function FormHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

Form.Logo = function FormLogo({ to, src, ...restProps }) {
  const goToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <ReactRouterLink to={to} onClick={goToTop}>
      <HeaderImg src={src} {...restProps} />
    </ReactRouterLink>
  );
};

Form.Title = function FormTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Form.Text = function FormText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Form.Error = function FormError({ children, ...restProps }) {
  return (
    <Error {...restProps}>
      <p>{children}</p>
    </Error>
  );
};

Form.Input = function FormInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

Form.Link = function FormLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
  return <SubmitBtn {...restProps}>{children}</SubmitBtn>;
};
