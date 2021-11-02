import React, { Suspense, useEffect } from "react";
import { Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Home, MovieDetail, Movies } from "./pages";
import { Loading } from "./components";
import { NavbarContainer } from "./containers/navigation";
import { pageView } from "./utils/gtag-helper";

export default function App() {
  const history = useHistory();
  useEffect(() => {
    history.listen((location) => {
      let path = location.pathname;
      if (location.hash) {
        path = location.pathname + location.hash;
      }
      pageView(path);
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
          <Route path="/movies" exact>
            <Movies />
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
