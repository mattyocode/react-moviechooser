import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../components";
import { AuthForm } from "../containers/auth-form";

export default function AuthPage({ children, ...restProps }) {
  // on click exit/out
  // if pages in history, go back to last page
  // if none, go to homepage
  const history = useHistory();
  const params = useParams();

  const exitAuthPageHandler = () => {
    history.push("/");
  };

  let login;
  if (params.params === "register") {
    login = false;
  } else if (params.params === "login") {
    login = true;
  } else {
    history.push("/");
  }

  return (
    <Modal openState={true} closeModal={exitAuthPageHandler}>
      {login ? (
        <AuthForm login={true} isPage={true} />
      ) : (
        <AuthForm login={false} isPage={true} />
      )}
    </Modal>
  );
}
