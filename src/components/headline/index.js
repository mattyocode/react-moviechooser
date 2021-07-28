import { rest } from "lodash";
import React from "react";

import { Wrapper, Title, Subhead } from "./styles/headline";

export default function Headline({ children, ...restProps }) {
  return (
    <Wrapper data-testid="headline" {...restProps}>
      {children}
    </Wrapper>
  );
}

Headline.Title = function PageTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Headline.Subhead = function PageSubhead({ children, ...restProps }) {
  return <Subhead {...restProps}>{children}</Subhead>;
};
