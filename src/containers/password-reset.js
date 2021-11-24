import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Loading } from "../components";
import largeLogo from "../assets/png/logo_large.png";
import { useHttp } from "../hooks";
import { client } from "../utils/axios-client";

export function PasswordReset({
  formik,
  handleFocus,
  formTypeHandler,
  recaptchaKey,
  setRecaptchaKey,
  closeModal,
  isPage,
}) {
  const { sendRequest, status, error, data } = useHttp(client);
  const history = useHistory();
  const recaptchaRef = useRef();
  const sitekey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  const recaptchaDisabled =
    formik.errors.email || formik.values.email.length < 4;

  const submitBtnDisabled = recaptchaDisabled || !recaptchaKey;

  const changeFormType = (type) => {
    formTypeHandler(type);
  };

  const handleRecaptcha = (key) => {
    setRecaptchaKey(key);
  };

  const submitResetHandler = (e) => {
    e.preventDefault();
    sendRequest(`/auth/request-reset-email/`, {
      body: {
        email: formik.values.email,
        redirect_url: `${process.env.REACT_APP_DOMAIN_NAME}/auth/new-password`,
      },
    });
  };

  const closeHandler = () => {
    if (isPage) {
      history.push("/");
    } else {
      closeModal();
    }
  };

  console.log("data >>>", data);
  console.log("status >>>", status);

  return (
    <Form>
      <Form.Header>
        {!isPage && <Form.Logo to={"/"} src={largeLogo} />}
        <Form.Title>
          <span role="img" aria-label="lock and key">
            &#129300;
          </span>
          Password Reset
        </Form.Title>
      </Form.Header>
      <Form.Text>
        {status === "idle" && "Enter email below to reset. "}
        <Form.Link onClick={() => changeFormType("login")}>
          Alternatively, click here to sign in.
        </Form.Link>
      </Form.Text>
      {status === "idle" && (
        <Form.Base onSubmit={submitResetHandler}>
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
            Reset Password
          </Form.Submit>
        </Form.Base>
      )}
      {status === "updating" && (
        <div>
          Loading!!!!!!
          <Loading small />
        </div>
      )}
      {status === "rejected" && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
      {status === "succeeded" && (
        <>
          <Form.FormSuccess style={{ padding: "1rem 0" }}>
            Success! {data.success}
          </Form.FormSuccess>
          <Form.Actions>
            <Form.ActionBtn onClick={() => changeFormType("login")}>
              Login
            </Form.ActionBtn>
            <Form.ActionBtn onClick={closeHandler}>Close</Form.ActionBtn>
          </Form.Actions>
        </>
      )}
    </Form>
  );
}
