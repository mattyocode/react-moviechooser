import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, signIn } from "../../../fixtures/navData";

import mainLogo from "../../../logo.png";

import {
  Nav,
  NavHeader,
  Logo,
  ToggleBtn,
  LinksContainer,
  LinksList,
  Link,
} from "./styles/Navigation";

const MainNavigation = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef();
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    if (showLinks) {
      linksContainerRef.current.style.height = "auto";
    } else {
      linksContainerRef.current.style.height = "0";
    }
  }, [showLinks]);

  return (
    <Nav>
      <NavHeader>
        <Logo src={mainLogo} />
        <ToggleBtn onClick={toggleLinks}>
          <FaBars />
        </ToggleBtn>
      </NavHeader>
      <LinksContainer ref={linksContainerRef}>
        <LinksList>
          {links.map((link) => {
            const { id, url, text, highlight } = link;
            return (
              <Link key={id} border={highlight}>
                <a href={url}>{text}</a>
              </Link>
            );
          })}
        </LinksList>
      </LinksContainer>
    </Nav>
  );
};

export default MainNavigation;
