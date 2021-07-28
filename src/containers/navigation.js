import React, { useState } from "react";
import { Navbar } from "../components";

import { linksData } from "../fixtures/navData";
import mainLogo from "../logo.png";

export function NavbarContainer({ children }) {
  const [showLinks, setShowLinks] = useState(false);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Logo to="/" src={mainLogo} alt="Movie Chooser" />
        <Navbar.ToggleBtn isOpen={showLinks} togglefn={toggleLinks} />
      </Navbar.Header>
      <Navbar.Links linksData={linksData} showLinks={showLinks} />
    </Navbar>
  );
}
