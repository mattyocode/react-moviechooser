import React from "react";
import ReactDOM from "react-dom";

import { Backdrop, Overlay } from "./styles/modal";

let portalElement = document.getElementById("overlays");
if (!portalElement) {
  portalElement = document.createElement("div");
  portalElement.setAttribute("id", "overlays");
  document.body.appendChild(portalElement);
}

export default function Modal({ closeModal, children, ...restProps }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop data-testid="modal-backdrop" onClick={closeModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Overlay data-testid="modal" {...restProps}>
          {children}
        </Overlay>,
        portalElement
      )}
    </>
  );
}
