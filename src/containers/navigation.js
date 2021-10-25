import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Navbar } from "../components";

import { elementScrollIntoView } from "seamless-scroll-polyfill";

import { linksData } from "../fixtures/navData";
import mainLogo from "../assets/png/logo.png";

export function NavbarContainer({ children }) {
  const [showLinks, setShowLinks] = useState(false);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  const closeLinks = () => {
    setShowLinks(false);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        elementScrollIntoView(
          document.querySelector(`#${location.hash.slice(1)}`),
          { behavior: "smooth", block: "center", inline: "center" }
        );
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    }
  }, [location]);

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Logo to="/" src={mainLogo} alt="Movie Chooser" />
        <Navbar.ToggleBtn isOpen={showLinks} togglefn={toggleLinks} />
      </Navbar.Header>
      <Navbar.Links
        linksData={linksData}
        showLinks={showLinks}
        togglefn={toggleLinks}
        closefn={closeLinks}
      />
    </Navbar>
  );
}
