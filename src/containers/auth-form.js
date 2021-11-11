import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Form } from "../components";
import { handleAuth, logout } from "../store/auth-slice";
import largeLogo from "../assets/png/logo_large.png";

export function AuthForm({ login = true, isPage = false, closeSelf = null }) {
  const [isLogin, setIsLogin] = useState(login);
  const user = useSelector((state) => state.persistedReducer.auth.account);
  const authStatus = useSelector((state) => state.persistedReducer.auth.status);
  const authError = useSelector((state) => state.persistedReducer.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoginToggler = () => {
    if (isPage) {
      const url = isLogin ? "/auth/register" : "/auth/login";
      history.push(url);
    }
    // if (!isPage && location.hash) {
    //   console.log("HASHHHH", location.hash);
    // }
    setIsLogin((prevState) => !prevState);
  };

  const loginHandler = (email, password) => {
    const endpoint = "login/";
    dispatch(handleAuth({ email, password, endpoint }));
    if (isPage && authStatus === "succeeded") {
      history.push("/");
    }

    if (!isPage && authStatus === "succeeded") {
      closeSelf();
    }
  };

  const registerHandler = (email, password) => {
    const endpoint = "register/";
    dispatch(handleAuth({ email, password, endpoint }));
    console.log("reg isPage & authStatus", isPage, authStatus);
    if (isPage && authStatus === "succeeded") {
      history.push("/");
    }
    if (!isPage && authStatus === "succeeded") {
      closeSelf();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  const SignInSchema = Yup.object().shape({
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
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      if (isLogin) {
        loginHandler(values.email, values.password);
      } else {
        registerHandler(
          values.email,
          values.password,
          values.passwordConfirmation
        );
      }
    },
    validationSchema: SignInSchema,
  });

  // add pwConf into criteria / give it its own?
  const btnDisabled =
    formik.errors.email || !formik.touched.email || formik.errors.password;

  let titleText;
  let subtitle;
  let link;
  let submitBtn;
  if (isLogin && !user) {
    titleText = "Sign In";
    subtitle = "No account? ";
    link = (
      <Form.Link onClick={isLoginToggler}>Click here to register.</Form.Link>
    );
    submitBtn = (
      <Form.Submit type="submit" disabled={btnDisabled}>
        Sign In
      </Form.Submit>
    );
  }
  if (!isLogin && !user) {
    titleText = "Register";
    subtitle = "Already signed up? ";
    link = (
      <Form.Link onClick={isLoginToggler}>Click here to sign in.</Form.Link>
    );
    submitBtn = (
      <Form.Submit type="submit" disabled={btnDisabled}>
        Register
      </Form.Submit>
    );
  }
  if (user) {
    titleText = "Signed In";
    subtitle = "Currently logged in. ";
    link = <Form.Link onClick={handleLogout}>Click here to log out.</Form.Link>;
    submitBtn = null;
  }

  return (
    <Form>
      <Form.Header>
        <Form.Logo to={"/"} src={largeLogo} />
        <Form.Title>
          <span role="img" aria-label="lock and key">
            &#128272;
          </span>
          {titleText}
        </Form.Title>
      </Form.Header>
      <Form.Text>
        {subtitle} {link}
      </Form.Text>

      {!user && (
        <Form.Base onSubmit={formik.handleSubmit}>
          <Form.Input
            placeholder="Enter email address"
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <Form.Error>*{formik.errors.email}</Form.Error>
          )}
          <Form.Input
            placeholder="Password"
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <Form.Error>*{formik.errors.password}</Form.Error>
          )}
          {!isLogin && (
            <Form.Input
              placeholder="Confirm password"
              id="passwordConfirmation"
              type="passwordConfirmation"
              name="passwordConfirmation"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          )}
          {!isLogin &&
            formik.errors.passwordConfirmation &&
            formik.touched.passwordConfirmation && (
              <Form.Error>*{formik.errors.passwordConfirmation}</Form.Error>
            )}
          {authStatus === "failed" && authError && (
            <Form.Error>{authError}</Form.Error>
          )}
          {submitBtn}
        </Form.Base>
      )}
    </Form>
  );
}
