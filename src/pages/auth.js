import React from "react";
import { useNavigate, useParams } from "react-router";
import { Modal } from "../components";
import { AuthForm } from "../containers/auth-form";

export default function AuthPage({ children, ...restProps }) {
  // on click exit/out
  // if pages in history, go back to last page
  // if none, go to homepage
  const navigate = useNavigate();
  const params = useParams();

  let formTypeInitial;
  if (params.params === "register") {
    formTypeInitial = "register";
  } else if (params.params === "login") {
    formTypeInitial = "login";
  } else if (params.params === "reset") {
    formTypeInitial = "reset";
  } else if (params.params === "new-password") {
    formTypeInitial = "new-password";
  } else {
    navigate("/");
  }

  return (
    <Modal.OverlayOnly {...restProps}>
      <AuthForm formTypeInitial={formTypeInitial} isPage={true} />
    </Modal.OverlayOnly>
  );
}
