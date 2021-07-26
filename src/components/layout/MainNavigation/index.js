import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { links } from "../../../fixtures/navData";

import mainLogo from "../../../logo.png";

import {
  Nav,
  NavHeader,
  Logo,
  Icon,
  Button,
  LinksContainer,
  LinksList,
  Link,
} from "./styles/Navigation";

const ToggleBtn = (props) => {
  const isOpen = props.isOpen;
  const isInitial = useRef(true);

  useEffect(() => {
    isInitial.current = false;
  }, []);

  return (
    <Button onClick={props.toggle}>
      <Icon current={!isOpen} isInitial={isInitial.current}>
        <FaBars />
      </Icon>
      <Icon current={isOpen} isInitial={isInitial.current}>
        <FaTimes />
      </Icon>
    </Button>
  );
};

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
