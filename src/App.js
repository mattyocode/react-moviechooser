import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
import { Home, MovieDetail, Movies } from "./pages";
import { Loading } from "./components";
import { NavbarContainer } from "./containers/navigation";

export default function App() {
  const history = createBrowserHistory();

  history.listen((location) => {
    ReactGA.initialize("G-ZXD4BK35ZX");
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

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
