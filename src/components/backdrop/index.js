import React from "react";

import Poster from "../poster";
import { Wrapper } from "./styles/backdrop";

// Blurred, faded copy of a movie's poster behind the page content. It uses
// the shared Poster (a real <img>, so a failed load can fall back), and
// shows only the placeholder gradient when nothing loads: the page already
// shows the title.
export default function Backdrop({ path, url, ...restProps }) {
  return (
    <Wrapper data-testid="backdrop" aria-hidden="true" {...restProps}>
      <Poster path={path} url={url} showTitle={false} sizes="342px" />
    </Wrapper>
  );
}
