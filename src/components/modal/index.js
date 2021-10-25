import React from "react";
import ReactDOM from "react-dom";

import { Backdrop, Close, Overlay } from "./styles/modal";

let portalElement = document.getElementById("overlays");
if (!portalElement) {
  portalElement = document.createElement("div");
  portalElement.setAttribute("id", "overlays");
  document.body.appendChild(portalElement);
}

export default function Modal({
  openState,
  closeModal,
  children,
  ...restProps
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop data-testid="modal-backdrop" onClick={closeModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Overlay data-testid="modal" {...restProps}>
          <Close onClick={closeModal}>{"\u{D7}"}</Close>
          {children}
        </Overlay>,
        portalElement
      )}
    </>
  );
}
