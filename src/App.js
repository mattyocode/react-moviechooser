import { AnimatePresence } from "framer-motion";
import React, { Suspense, useEffect, useRef } from "react";
import { getCookieConsentValue } from "react-cookie-consent";
import TagManager from "react-gtm-module";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { ErrorBoundary, Loading } from "./components";
import KofiWidget from "./components/ko-fi/KofiWidget";
import { CookieConsentContainer } from "./containers/cookie-consent";
import { NavbarContainer } from "./containers/navigation";
import { AuthPage, Home, List, MovieDetail, Movies } from "./pages";
import ProtectedRoute from "./routes/protected-route";

import { linksData } from "./fixtures/navData";

// Pages manage their own scroll position (e.g. results restore it on Back), so
// stop the browser restoring a stale one after the page has rendered.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export default function App() {
  const location = useLocation();
  // Report navigations after the first page, as history.listen did. The key
  // check also keeps StrictMode's repeated effect from counting a page twice.
  const lastLocationKey = useRef(location.key);

  useEffect(() => {
    if (location.key === lastLocationKey.current) return;
    lastLocationKey.current = location.key;

    const isConsent = getCookieConsentValue();
    if (isConsent) {
      let path = location.pathname;
      if (location.hash) {
        path = location.pathname + location.hash;
      }
      TagManager.initialize({ gtmId: "GTM-MT7G2TR" });
      TagManager.dataLayer({
        dataLayer: {
          page: path,
        },
      });
    }
  }, [location]);

  return (
    <Suspense fallback={<Loading />}>
      <NavbarContainer linksData={linksData} />
      <ErrorBoundary resetKey={location.pathname}>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId/*" element={<MovieDetail />} />
            <Route path="/auth/:params/*" element={<AuthPage />} />
            <Route
              path="/user/lists/*"
              element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
      <CookieConsentContainer />
      <KofiWidget />
    </Suspense>
  );
}
