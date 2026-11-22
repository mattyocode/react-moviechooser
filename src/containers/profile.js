import React, { useEffect } from "react";
import { Form, Profile } from "../components";
import axios from "axios";
import { client } from "../utils/axios-refresh";
import { useHttp } from "../hooks";
import largeLogo from "../assets/png/logo_large.png";

// "4 March 2026", or null when the API sent no usable date.
function formatJoined(value) {
  const date = new Date(value);
  if (!value || Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ProfileData({ account, handleLogout }) {
  const { sendRequest, status, error, data: profileData } = useHttp(client);

  const displayName =
    account.username ||
    (account.email && account.email.substr(0, account.email.indexOf("@")));

  useEffect(() => {
    const userId = account?.uid;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    sendRequest(`/accounts/user/${userId}/`, { cancelToken: source.token });
    return () => {
      source.cancel("axios request cancelled");
    };
  }, [account, sendRequest]);

  const joined =
    status === "succeeded" && profileData
      ? formatJoined(profileData.date_joined)
      : null;

  return (
    <Form>
      <Form.Header>
        <Form.Logo to={"/"} src={largeLogo} />
        <Form.Title>
          <span role="img" aria-label="lock and key">
            &#128272;
          </span>
          Signed In
        </Form.Title>
      </Form.Header>
      <Form.Text>
        {displayName
          ? `${displayName}, you're logged in`
          : "You're currently logged in."}
      </Form.Text>
      <Profile>
        {status === "succeeded" && profileData && (
          <Profile.Data>
            <Profile.Title>Your profile</Profile.Title>
            <Profile.Item>
              <Profile.Field>Username: </Profile.Field>
              <Profile.Value>
                {profileData.username || "[No username set]"}
              </Profile.Value>
            </Profile.Item>
            <Profile.Item>
              <Profile.Field>Email: </Profile.Field>
              <Profile.Value>{profileData.email}</Profile.Value>
            </Profile.Item>
            {joined && (
              <Profile.Item>
                <Profile.Field>Joined: </Profile.Field>
                <Profile.Value>{joined}</Profile.Value>
              </Profile.Item>
            )}
          </Profile.Data>
        )}
        {status === "rejected" && <Profile.Error>Oops! {error}</Profile.Error>}
      </Profile>
      <Form.Actions>
        <Form.ActionBtn onClick={handleLogout}>Log Out</Form.ActionBtn>
      </Form.Actions>
    </Form>
  );
}
