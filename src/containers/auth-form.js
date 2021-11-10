import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Form } from "../components";
import largeLogo from "../assets/png/logo_large.png";

export function AuthForm({ login = true, isPage = false }) {
  const [isLogin, setIsLogin] = useState(login);
  // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const isLoginToggler = () => {
    if (isPage) {
      const url = isLogin ? "/auth/register" : "/auth/login";
      history.push(url);
    }
    if (!isPage && location.hash) {
      console.log("HASHHHH", location.hash);
    }
    setIsLogin((prevState) => !prevState);
  };

  const loginHandler = (email, password) => {};
  const registerHandler = (email, password, passwordConfirmation) => {};

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
      setLoading(true);
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
    formik.errors.email ||
    !formik.touched.email ||
    formik.errors.password ||
    !formik.touched.password;

  return (
    <Form>
      <Form.Header>
        <Form.Logo to={"/"} src={largeLogo} />
        <Form.Title>
          <span role="img" aria-label="lock and key">
            &#128272;
          </span>
          {isLogin ? "Sign In" : "Register"}
        </Form.Title>
      </Form.Header>
      <Form.Text>
        {isLogin ? "No account? " : "Already signed up? "}
        {isLogin ? (
          <Form.Link onClick={isLoginToggler}>
            Click here to register.
          </Form.Link>
        ) : (
          <Form.Link onClick={isLoginToggler}>Click here to sign in.</Form.Link>
        )}
      </Form.Text>
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
        <Form.Submit type="submit" disabled={btnDisabled}>
          {isLogin ? "Sign in!" : "Register"}
        </Form.Submit>
      </Form.Base>
    </Form>
  );
}
