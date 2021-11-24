import React from "react";
import ReactDOM from "react-dom";

import {
  Backdrop,
  Close,
  Overlay,
  LockBody,
  ReleaseBody,
  ModalContent,
  ModalWrapper,
} from "./styles/modal";

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
        <ModalWrapper>
          <Overlay data-testid="modal" {...restProps}>
            <LockBody />
            <Close onClick={closeModal}>{"\u{D7}"}</Close>
            <ModalContent>{children}</ModalContent>
          </Overlay>
        </ModalWrapper>,
        portalElement
      )}
    </>
  );
}

Modal.ReleaseBody = function ModalReleaseBody() {
  return <ReleaseBody />;
};

Modal.OverlayOnly = function ModalOverlayOnly({ children, ...restProps }) {
  return (
    <ModalWrapper>
      <Overlay data-testid="modal" {...restProps}>
        <ModalContent>{children}</ModalContent>
      </Overlay>
    </ModalWrapper>
  );
};
