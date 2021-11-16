import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { Form } from "../components";
import { ProfileData } from "./profile-data";
import { handleAuth, setLogout, clearStatus } from "../store/auth-slice";
import largeLogo from "../assets/png/logo_large.png";

export function AuthForm({ login = true, isPage = false, closeSelf }) {
  const [isLogin, setIsLogin] = useState(login);
  const [showProfile, setShowProfile] = useState(false);
  const [activeField, setActiveField] = useState(false);
  const [recaptchaKey, setRecaptchaKey] = useState();
  const account = useSelector((state) => state.persistedReducer.auth.account);
  const authStatus = useSelector((state) => state.persistedReducer.auth.status);
  const authError = useSelector((state) => state.persistedReducer.auth.error);
  const dispatch = useDispatch();
  const history = useHistory();
  const succeedRef = useRef();
  const recaptchaRef = useRef();
  const sitekey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const isLoginToggler = () => {
    if (isPage) {
      const url = isLogin ? "/auth/register" : "/auth/login";
      history.push(url);
    }
    setIsLogin((prevState) => !prevState);
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
      recaptchaRef.current.reset();
      setRecaptchaKey(false);
    }
  };

  useEffect(() => {
    console.log("useEffect authStatus", authStatus);
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

  const handleLogout = () => {
    dispatch(setLogout());
    history.push("/");
  };

  const toggleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleFocus = (e) => {
    setActiveField(e.target.name);
  };

  const handleRecaptcha = (key) => {
    setRecaptchaKey(key);
  };

  const SignInSchema = Yup.object().shape({
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
      if (isLogin) {
        loginHandler(values.email, values.password);
      } else {
        registerHandler(
          values.username,
          values.email,
          values.password,
          values.passwordConfirmation
        );
      }
    },
    validationSchema: SignInSchema,
  });

  const loginBtnDisabled =
    formik.errors.email || !formik.touched.email || formik.errors.password;

  const recaptchaDisabled =
    formik.errors.email ||
    !formik.touched.email ||
    formik.errors.password ||
    !formik.touched.password ||
    formik.errors.passwordConfirmation ||
    formik.values.passwordConfirmation.length < 8;

  const registerBtnDisabled = recaptchaDisabled || !recaptchaKey;

  let titleText;
  let subtitle;
  let link;
  let submitBtn;
  let actionBtns;

  if (isLogin && !account) {
    titleText = "Sign In";
    subtitle = "No account? ";
    link = (
      <Form.Link onClick={isLoginToggler}>Click here to register.</Form.Link>
    );
    submitBtn = (
      <Form.Submit type="submit" disabled={loginBtnDisabled}>
        Sign In
      </Form.Submit>
    );
  }

  if (!isLogin && !account) {
    titleText = "Register";
    subtitle = "Already signed up? ";
    link = (
      <Form.Link onClick={isLoginToggler}>Click here to sign in.</Form.Link>
    );
    submitBtn = (
      <Form.Submit type="submit" disabled={registerBtnDisabled}>
        Register
      </Form.Submit>
    );
  }

  if (account) {
    titleText = "Signed In";
    subtitle =
      `${
        account.username ||
        (account.email && account.email.substr(0, account.email.indexOf("@")))
      }, you're logged in` || "You're currently logged in.";
    submitBtn = null;
  }
  actionBtns = (
    <Form.Actions>
      <Form.ActionBtn
        onClick={toggleShowProfile}
        className={showProfile ? "active" : ""}
      >
        View Profile
      </Form.ActionBtn>
      <Form.ActionBtn onClick={handleLogout}>Log Out</Form.ActionBtn>
    </Form.Actions>
  );

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
      {account && actionBtns}
      {account && showProfile && <ProfileData account={account} />}
      {!account && (
        <Form.Base onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <Form.Input
              placeholder="Username (optional)"
              id="username"
              type="username"
              name="username"
              autocomplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFocus}
            />
          )}
          {!isLogin && formik.errors.username && formik.touched.username && (
            <Form.FieldError>*{formik.errors.username}</Form.FieldError>
          )}
          <Form.Input
            placeholder="Enter email address"
            id="email"
            type="email"
            name="email"
            autocomplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFocus}
          />
          {formik.errors.email && formik.touched.email && (
            <Form.FieldError>*{formik.errors.email}</Form.FieldError>
          )}
          <Form.Input
            placeholder="Password"
            id="password"
            type="password"
            name="password"
            autocomplete={isLogin ? "current-password" : "new-password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFocus}
          />
          {formik.errors.password && formik.touched.password && (
            <Form.FieldError>*{formik.errors.password}</Form.FieldError>
          )}
          {!isLogin && (
            <Form.Input
              placeholder="Confirm password"
              id="passwordConfirmation"
              type="password"
              name="passwordConfirmation"
              autocomplete="new-password"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={handleFocus}
            />
          )}
          {!isLogin &&
            formik.errors.passwordConfirmation &&
            formik.touched.passwordConfirmation && (
              <Form.FieldError>
                *{formik.errors.passwordConfirmation}
              </Form.FieldError>
            )}
          {authStatus === "failed" && authError && !activeField && (
            <Form.FormError>
              {authError}
              {activeField}
            </Form.FormError>
          )}
          {!isLogin && !recaptchaDisabled && (
            <ReCAPTCHA
              onChange={handleRecaptcha}
              ref={recaptchaRef}
              sitekey={sitekey}
              theme="dark"
              size="compact"
              style={{ paddingTop: "1rem" }}
            />
          )}
          {submitBtn}
        </Form.Base>
      )}
    </Form>
  );
}
