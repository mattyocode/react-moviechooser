import React from "react";
import { Form } from "../components";
import largeLogo from "../assets/png/logo_large.png";

export function Login({
  formik,
  handleFocus,
  formTypeHandler,
  authStatus,
  authError,
  activeField,
  isPage,
}) {
  const submitBtnDisabled =
    formik.errors.email || !formik.touched.email || formik.errors.password;

  const changeFormType = (type) => {
    formTypeHandler(type);
  };

  return (
    <Form>
      <Form.Header>
        {!isPage && <Form.Logo to={"/"} src={largeLogo} />}
        <Form.Title>
          <span role="img" aria-label="lock and key">
            &#128272;
          </span>
          Sign In
        </Form.Title>
      </Form.Header>
      <Form.Text>
        No account?{" "}
        <Form.Link onClick={() => changeFormType("register")}>
          Click here to register.
        </Form.Link>
      </Form.Text>
      <Form.Base onSubmit={formik.handleSubmit}>
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
          autocomplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={handleFocus}
        />
        {formik.errors.password && formik.touched.password && (
          <Form.FieldError>*{formik.errors.password}</Form.FieldError>
        )}
        {authStatus === "failed" && authError && !activeField && (
          <Form.FormError>{authError}</Form.FormError>
        )}
        <Form.Submit type="submit" disabled={submitBtnDisabled}>
          Sign In
        </Form.Submit>
      </Form.Base>
      <Form.Text>
        Forgotten your password?{" "}
        <Form.Link onClick={() => changeFormType("reset")}>
          Click here to reset.
        </Form.Link>
      </Form.Text>
    </Form>
  );
}
