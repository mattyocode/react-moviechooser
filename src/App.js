import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Movies } from "./pages";

export default function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies" exact>
        <Movies />
      </Route>
    </Switch>
  );
}
