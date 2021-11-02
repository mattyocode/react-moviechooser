import React, { Suspense, useEffect } from "react";
import { Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import ReactGA from "react-ga";
import { Home, MovieDetail, Movies } from "./pages";
import { Loading } from "./components";
import { NavbarContainer } from "./containers/navigation";

export default function App() {
  const history = useHistory();
  useEffect(() => {
    history.listen((location) => {
      let path = location.pathname;
      if (location.hash) {
        path = location.pathname + location.hash;
      }
      ReactGA.initialize("G-ZXD4BK35ZX");
      ReactGA.set({ page: path });
      ReactGA.pageview(path);
    });
  }, [history]);

  return (
    <Suspense fallback={<Loading />}>
      <Router history={history}>
        <NavbarContainer />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movies" exact component={Movies}>
            {/* <Movies /> */}
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetail />
          </Route>
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </Suspense>
  );
}
