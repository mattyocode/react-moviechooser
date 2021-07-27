import React, { useState, useEffect } from "react";
import { links } from "../../../fixtures/navData";

import mainLogo from "../../../logo.png";

const MainNavigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef();
  const linksListRef = useRef();
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksListRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0";
    }
  }, [showLinks]);

  return (
    <Nav data-testid="navigation">
      <NavHeader>
        <Logo src={mainLogo} />
        <ToggleBtn
          toggle={toggleLinks}
          isOpen={showLinks}
          data-testid="toggle-btn"
        />
      </NavHeader>
      <LinksContainer ref={linksContainerRef}>
        <LinksList ref={linksListRef}>
          {links.map((link) => {
            const { id, url, text, highlight } = link;
            return (
              <li>
                <NavLink key={id} to={url} border={highlight}>
                  {text}
                </NavLink>
              </li>
            );
          })}
        </LinksList>
      </LinksContainer>
    </Nav>
  );
};

export default MainNavigation;
