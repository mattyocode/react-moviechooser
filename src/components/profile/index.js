import React from "react";
import {
  ProfileWrapper,
  DataList,
  DataItem,
  Title,
  Field,
  Value,
} from "./styles/profile";

export default function Profile({ children, ...restProps }) {
  return <ProfileWrapper {...restProps}>{children}</ProfileWrapper>;
}

Profile.Title = function ProfileTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Profile.Data = function ProfileData({ children, ...restProps }) {
  return <DataList {...restProps}>{children}</DataList>;
};

Profile.Item = function ProfileItem({ children, ...restProps }) {
  return <DataItem {...restProps}>{children}</DataItem>;
};

Profile.Field = function ProfileField({ children, ...restProps }) {
  return <Field {...restProps}>{children}</Field>;
};

Profile.Value = function ProfileValue({ children, ...restProps }) {
  return <Value {...restProps}>{children}</Value>;
};
