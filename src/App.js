import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { Home, MovieDetail, Movies } from "./pages";
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
        <Route path="/movie/:movieId">
          <MovieDetail />
        </Route>
      </Switch>
    </Suspense>
  );
}
