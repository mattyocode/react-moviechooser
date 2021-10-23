import React from "react";

import { ReleaseBody, Spinner } from "./styles/loading";

export default function Loading({ small, ...restProps }) {
  return <Spinner data-testid="loading-spinner" small={small} {...restProps} />;
}

Loading.ReleaseBody = function LoadingReleaseBody() {
  return <ReleaseBody />;
};
