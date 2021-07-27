import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages";

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  );
}
