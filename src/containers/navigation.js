import React, { useState } from "react";
import { Navbar } from "../components";

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
