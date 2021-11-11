import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, ...restProps }) {
  const user = useSelector((state) => state.persistedReducer.auth);

  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (user.account) {
          return children;
        }

        if (!user.account) {
          return (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}
