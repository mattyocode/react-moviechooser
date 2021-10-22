import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, MovieDetail, Movies } from "./pages";
import { Loading, Navbar } from "./components";
import { NavbarContainer } from "./containers/navigation";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <NavbarContainer />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movies" exact>
            <Movies />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetail />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}
