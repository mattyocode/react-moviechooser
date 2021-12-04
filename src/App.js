import React, { Suspense, useEffect } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { CookieConsentContainer } from "./containers/cookie-consent";
import { getCookieConsentValue } from "react-cookie-consent";
import TagManager from "react-gtm-module";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./routes/protected-route";
import { AuthPage, Home, List, MovieDetail, Movies } from "./pages";
import { Loading } from "./components";
import { NavbarContainer } from "./containers/navigation";

export default function App() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: "GTM-MT7G2TR",
    };
    history.listen((location) => {
      const isConsent = getCookieConsentValue();
      if (isConsent) {
        let path = location.pathname;
        if (location.hash) {
          path = location.pathname + location.hash;
        }
        TagManager.initialize(tagManagerArgs);
        TagManager.dataLayer({
          dataLayer: {
            page: path,
          },
        });
      }
    });
  }, [history]);

  return (
    <Suspense fallback={<Loading />}>
      <NavbarContainer />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movies" exact>
            <Movies />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetail />
          </Route>
          <Route path="/auth/:params">
            <AuthPage />
          </Route>
          <ProtectedRoute path="/user/lists">
            <List />
          </ProtectedRoute>
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </AnimatePresence>
      <CookieConsentContainer />
    </Suspense>
  );
}
