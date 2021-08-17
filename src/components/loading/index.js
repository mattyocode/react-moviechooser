import React from "react";

import { LockBody, ReleaseBody, Spinner } from "./styles/loading";

export default function Loading({ ...restProps }) {
  return <Spinner {...restProps} />;
}

Loading.ReleaseBody = function LoadingReleaseBody() {
  return <ReleaseBody />;
};
