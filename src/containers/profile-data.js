import React from "react";
import { Profile } from "../components";

export function ProfileData({ userData }) {
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
  let d;
  if (userData.data.date_joined) {
    d = new Date(userData.data.date_joined);
  }
  return (
    <Profile>
      <Profile.Data>
        <Profile.Title>Your profile</Profile.Title>
        <Profile.Item>
          <Profile.Field>Username: </Profile.Field>
          <Profile.Value>
            {userData.data.username
              ? userData.data.username
              : "[No username set]"}
          </Profile.Value>
        </Profile.Item>
        <Profile.Item>
          <Profile.Field>Email: </Profile.Field>
          <Profile.Value>{userData.data.email}</Profile.Value>
        </Profile.Item>
        <Profile.Item>
          <Profile.Field>Joined: </Profile.Field>
          <Profile.Value>{`${d.getDate()} ${
            monthNames[d.getMonth()]
          } ${d.getFullYear()}`}</Profile.Value>
        </Profile.Item>
      </Profile.Data>
    </Profile>
  );
}
