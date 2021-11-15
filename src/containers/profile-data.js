import React, { useEffect } from "react";
import { Profile } from "../components";
import { fetcher } from "../utils/axios-refresh";
import { useHttp } from "../hooks";

export function ProfileData({ account }) {
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

  let d;
  console.log("profileData in body >>", profileData);
  if (status === "succeeded" && profileData) {
    console.log("success conditional - profileData >>", profileData);
    d = new Date(profileData.date_joined);
  }

  useEffect(() => {
    const userId = account?.uid;
    console.log("profile-data useEffect", userId);
    sendRequest(`/accounts/user/${userId}/`);
    // return () => {}
  }, [account, sendRequest]);

  return (
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
  );
}
