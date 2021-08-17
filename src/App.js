import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Movies } from "./pages";
import { Loading } from "./components";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
      </Switch>
    </Suspense>
  );
}
