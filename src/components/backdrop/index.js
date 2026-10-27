import React from "react";

import { Wrapper } from "./styles/backdrop";

// Blurred, faded copy of an image behind the page content, e.g. a movie poster.
export default function Backdrop({ src, ...restProps }) {
  if (!src) return null;
  return (
    <Wrapper
      data-testid="backdrop"
      aria-hidden="true"
      style={{ backgroundImage: `url("${src}")` }}
      {...restProps}
    />
  );
}
