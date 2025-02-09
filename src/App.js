import React, { Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { getCookieConsentValue } from "react-cookie-consent";
import TagManager from "react-gtm-module";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

import { CookieConsentContainer } from "./containers/cookie-consent";
import ProtectedRoute from "./routes/protected-route";
import { AuthPage, Home, List, MovieDetail, Movies } from "./pages";
import { Loading } from "./components";
import { NavbarContainer } from "./containers/navigation";

import { linksData } from "./fixtures/navData";

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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.onload = () => {
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw('mattyo', {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#00b9fe',
          'floating-chat.donateButton.text-color': '#fff',
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <NavbarContainer linksData={linksData} />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location}>
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
