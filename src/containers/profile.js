import React, { useState, useEffect } from "react";
import { Form, Profile } from "../components";
import { fetcher } from "../utils/axios-refresh";
import { useHttp } from "../hooks";
import largeLogo from "../assets/png/logo_large.png";

export function ProfileData({ account, handleLogout }) {
  const [showProfile, setShowProfile] = useState(false);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { sendRequest, status, error, data: profileData } = useHttp(fetcher);

  const toggleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  let d;
  if (status === "succeeded" && profileData) {
    d = new Date(profileData.date_joined);
  }

  useEffect(() => {
    const userId = account?.uid;
    console.log("profile-data useEffect", userId);
    sendRequest(`/accounts/user/${userId}/`);
    // return () => {}
  }, [account, sendRequest]);

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
        {`${
          account.username ||
          (account.email && account.email.substr(0, account.email.indexOf("@")))
        }, you're logged in` || "You're currently logged in."}
      </Form.Text>
      <Form.Actions>
        <Form.ActionBtn
          onClick={toggleShowProfile}
          className={showProfile ? "active" : ""}
        >
          View Profile
        </Form.ActionBtn>
        <Form.ActionBtn onClick={handleLogout}>Log Out</Form.ActionBtn>
      </Form.Actions>
      {showProfile && (
        <Profile>
          {status === "succeeded" && (
            <Profile.Data>
              <Profile.Title>Your profile</Profile.Title>
              <Profile.Item>
                <Profile.Field>Username: </Profile.Field>
                <Profile.Value>
                  {profileData.username
                    ? profileData.username
                    : "[No username set]"}
                </Profile.Value>
              </Profile.Item>
              <Profile.Item>
                <Profile.Field>Email: </Profile.Field>
                <Profile.Value>{profileData.email}</Profile.Value>
              </Profile.Item>
              <Profile.Item>
                <Profile.Field>Joined: </Profile.Field>
                <Profile.Value>{`${d.getDate()} ${
                  monthNames[d.getMonth()]
                } ${d.getFullYear()}`}</Profile.Value>
              </Profile.Item>
            </Profile.Data>
          )}
          {status === "error" && <Profile.Error>Oops! {error}</Profile.Error>}
        </Profile>
      )}
    </Form>
  );
}
