import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Movies, Surprise } from "./pages";
import { Loading } from "./components";
import { NavbarContainer } from "./containers/navigation";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <NavbarContainer />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/surprise" exact>
          <Surprise />
        </Route>
      </Switch>
    </Suspense>
  );
}
