import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Form } from "../components";
import largeLogo from "../assets/png/logo_large.png";

export function Register({
  formik,
  handleFocus,
  formTypeHandler,
  authStatus,
  authError,
  activeField,
  recaptchaKey,
  setRecaptchaKey,
  isPage,
}) {
  const recaptchaRef = useRef();
  const sitekey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const handleRecaptcha = (key) => {
    setRecaptchaKey(key);
  };

  const changeFormType = (type) => {
    formTypeHandler(type);
  };

  const recaptchaDisabled =
    formik.errors.email ||
    !formik.touched.email ||
    formik.errors.password ||
    !formik.touched.password ||
    formik.errors.passwordConfirmation ||
    formik.values.passwordConfirmation.length < 8;

  const submitBtnDisabled = recaptchaDisabled || !recaptchaKey;

  return (
    <Form>
      <Form.Header>
        {!isPage && <Form.Logo to={"/"} src={largeLogo} />}
        <Form.Title>
          <span role="img" aria-label="lock and key">
            &#128272;
          </span>
          Register
        </Form.Title>
      </Form.Header>
      <Form.Text>
        Already signed up?{" "}
        <Form.Link onClick={() => changeFormType("login")}>
          Click here to sign in.
        </Form.Link>
      </Form.Text>
      <Form.Base onSubmit={formik.handleSubmit}>
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
        {formik.errors.username && formik.touched.username && (
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
          autocomplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={handleFocus}
        />
        {formik.errors.password && formik.touched.password && (
          <Form.FieldError>*{formik.errors.password}</Form.FieldError>
        )}
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
        {formik.errors.passwordConfirmation &&
          formik.touched.passwordConfirmation && (
            <Form.FieldError>
              *{formik.errors.passwordConfirmation}
            </Form.FieldError>
          )}
        {authStatus === "failed" && authError && !activeField && (
          <Form.FormError>{authError}</Form.FormError>
        )}
        {!recaptchaDisabled && (
          <ReCAPTCHA
            onChange={handleRecaptcha}
            ref={recaptchaRef}
            sitekey={sitekey}
            theme="dark"
            size="compact"
            style={{ paddingTop: "1rem" }}
          />
        )}
        <Form.Submit type="submit" disabled={submitBtnDisabled}>
          Register
        </Form.Submit>
        <Form.Text>
          Forgotten your password?{" "}
          <Form.Link onClick={() => changeFormType("reset")}>
            Click here to reset.
          </Form.Link>
        </Form.Text>
      </Form.Base>
    </Form>
  );
}
