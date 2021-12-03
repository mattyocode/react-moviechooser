import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

import {
  Backdrop,
  Close,
  Overlay,
  LockBody,
  ReleaseBody,
  ModalContent,
  ModalWrapper,
} from "./styles/modal";

const backdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};

const dropIn = {
  hidden: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

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
        <Backdrop
          as={motion.div}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          data-testid="modal-backdrop"
          onClick={closeModal}
        />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalWrapper>
          <Overlay
            as={motion.div}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-testid="modal"
            {...restProps}
          >
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
