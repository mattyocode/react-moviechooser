import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../components";
import { Auth } from "../containers/auth";

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
        <Auth login={true} isPage={true} />
      ) : (
        <Auth login={false} isPage={true} />
      )}
    </Modal>
  );
}
