import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Loading } from "../components";
import largeLogo from "../assets/png/logo_large.png";
import { useHttp } from "../hooks";
import { client } from "../utils/axios-client";

export function NewPassword({
  formik,
  handleFocus,
  formTypeHandler,
  activeField,
  isPage,
}) {
  const { sendRequest, status, error, data } = useHttp(client);
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uidb64 = queryParams.get("uidb64");
  const token = queryParams.get("token");

  const submitBtnDisabled =
    formik.errors.password ||
    !formik.touched.password ||
    formik.errors.passwordConfirmation ||
    formik.values.passwordConfirmation.length < 8;

  const changeFormType = (type) => {
    formTypeHandler(type);
  };

  const submitResetHandler = (e) => {
    e.preventDefault();
    sendRequest(`/auth/set-new-password/`, {
      method: "PATCH",
      body: {
        password: formik.values.passwordConfirmation,
        uidb64: uidb64,
        token: token,
      },
    });
  };

  const leaveHandler = () => {
    history.push("/");
  };

  console.log("data >>>", data);
  console.log("status >>>", status);

  return (
    <Form>
      <Form.Header>
        {!isPage && <Form.Logo to={"/"} src={largeLogo} />}
        <Form.Title>
          <span role="img" aria-label="lock and key">
            &#128394;
          </span>
          New Password
        </Form.Title>
      </Form.Header>
      {status === "idle" && (
        <>
          <Form.Text>Enter new password below.</Form.Text>
          <Form.Base onSubmit={submitResetHandler}>
            <Form.Input
              placeholder="New password"
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
              placeholder="Confirm new password"
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
            <Form.Submit type="submit" disabled={submitBtnDisabled}>
              Set New Password
            </Form.Submit>
          </Form.Base>
        </>
      )}
      {status === "updating" && <Loading small />}
      {status === "rejected" && (
        <>
          <Form.FormError style={{ padding: "1rem 0" }}>
            Error: {error}
          </Form.FormError>
          <Form.Actions>
            <Form.ActionBtn onClick={() => changeFormType("reset")}>
              Try again
            </Form.ActionBtn>
            <Form.ActionBtn onClick={leaveHandler}>Home</Form.ActionBtn>
          </Form.Actions>
        </>
      )}
      {status === "succeeded" && (
        <>
          <Form.FormSuccess>Success! {data.success}</Form.FormSuccess>
          <Form.Actions>
            <Form.ActionBtn onClick={() => changeFormType("login")}>
              Login
            </Form.ActionBtn>
            <Form.ActionBtn onClick={leaveHandler}>Home</Form.ActionBtn>
          </Form.Actions>
        </>
      )}
    </Form>
  );
}
