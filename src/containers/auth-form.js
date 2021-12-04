import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Login } from "./login";
import { Register } from "./register";
import { ProfileData } from "./profile";
import { PasswordReset } from "./password-reset";
import { NewPassword } from "./new-password";
import { handleAuth, setLogout, clearStatus } from "../store/auth-slice";

export function AuthForm({
  formTypeInitial = "login",
  isPage = false,
  closeSelf,
}) {
  const [formType, setFormType] = useState(formTypeInitial);
  const [activeField, setActiveField] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState();
  const account = useSelector((state) => state.persistedReducer.auth.account);
  const authStatus = useSelector((state) => state.persistedReducer.auth.status);
  const authError = useSelector((state) => state.persistedReducer.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const succeedRef = useRef();

  const formTypeHandler = (type) => {
    setFormType(type);
    if (isPage) {
      const url = `/auth/${type}`;
      history.push(url);
    }
    dispatch(clearStatus());
  };

  const loginHandler = (email, password) => {
    const endpoint = "login/";
    setActiveField(false);
    dispatch(handleAuth({ email, password, endpoint }));
  };

  const registerHandler = async (username, email, password) => {
    const endpoint = "register/";
    if (username === "") {
      username = undefined;
    }
    setActiveField(false);
    if (recaptchaKey) {
      dispatch(
        handleAuth({ username, email, password, endpoint, recaptchaKey })
      );
      // recaptchaRef.current.reset();
      setRecaptchaKey(false);
    }
  };

  const resetHandler = (email) => {
    const endpoint = "reset/";
    setActiveField(false);
    dispatch(handleAuth({ email, endpoint }));
  };

  useEffect(() => {
    if (authStatus === "succeeded" && succeedRef.current === false) {
      if (isPage) {
        history.push("/");
      } else {
        closeSelf();
      }
      succeedRef.current = true;
    }
    return () => {
      succeedRef.current = false;
    };
  }, [authStatus, history, isPage, closeSelf]);

  useEffect(() => {
    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (formType !== formTypeInitial && isPage) {
      setFormType(formTypeInitial);
    }
  }, [formType, formTypeInitial, isPage]);

  const handleLogout = () => {
    dispatch(setLogout());
    history.push("/");
  };

  const handleFocus = (e) => {
    setActiveField(e.target.name);
  };

  const authSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username must be at least 2 characters")
      .max(24, "Max username length is 24 characters")
      .nullable()
      .notRequired(),
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Password is required"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      if (formType === "login") {
        loginHandler(values.email, values.password);
      }
      if (formType === "register") {
        registerHandler(
          values.username,
          values.email,
          values.password,
          values.passwordConfirmation
        );
      }
      if (formType === "rest") {
        resetHandler(values.email);
      }
    },
    validationSchema: authSchema,
  });

  return (
    <>
      {!account && formType === "login" && (
        <Login
          formik={formik}
          handleFocus={handleFocus}
          formTypeHandler={formTypeHandler}
          authStatus={authStatus}
          authError={authError}
          activeField={activeField}
          isPage={isPage}
        />
      )}
      {!account && formType === "register" && (
        <Register
          formik={formik}
          handleFocus={handleFocus}
          formTypeHandler={formTypeHandler}
          authStatus={authStatus}
          authError={authError}
          activeField={activeField}
          recaptchaKey={recaptchaKey}
          setRecaptchaKey={setRecaptchaKey}
          isPage={isPage}
        />
      )}
      {account && authStatus === "idle" && (
        <ProfileData account={account} handleLogout={handleLogout} />
      )}
      {!account && formType === "reset" && (
        <PasswordReset
          formik={formik}
          handleFocus={handleFocus}
          formTypeHandler={formTypeHandler}
          activeField={activeField}
          closeModal={closeSelf}
          isPage={isPage}
          recaptchaKey={recaptchaKey}
          setRecaptchaKey={setRecaptchaKey}
        />
      )}
      {!account && formType === "new-password" && (
        <NewPassword
          formik={formik}
          handleFocus={handleFocus}
          formTypeHandler={formTypeHandler}
          activeField={activeField}
          isPage={isPage}
        />
      )}
    </>
  );
}
