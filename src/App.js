import React, { Suspense, useEffect } from "react";
import { Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Home, MovieDetail, Movies } from "./pages";
import { Loading } from "./components";
import { NavbarContainer } from "./containers/navigation";
import { pageView } from "./utils/gtag-helper";

import CookieConsent from "react-cookie-consent";

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
        <CookieConsent
          enableDeclineButton
          style={{ background: "#222", opacity: "0.95" }}
          buttonStyle={{
            background: "#51c7d6",
            fontFamily: "HelveticaNeue-CondensedBold, sans-serif",
          }}
        >
          This website uses cookies to enhance user experience.
        </CookieConsent>
      </Router>
    </Suspense>
  );
}
