import React, { useRef, useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import {
  Nav,
  NavHeader,
  Logo,
  Icon,
  Button,
  LinksContainer,
  LinksList,
  NavBarLink,
} from "./styles/navigation";

export default function Navbar({ children, ...restProps }) {
  return (
    <Nav data-testid="navigation" {...restProps}>
      {children}
    </Nav>
  );
}

Navbar.Header = function Header({ children, ...restProps }) {
  return <NavHeader {...restProps}>{children}</NavHeader>;
};

Navbar.Logo = function NavLogo({ to, src, ...restProps }) {
  return (
    <ReactRouterLink to={to}>
      <Logo src={src} {...restProps} />
    </ReactRouterLink>
  );
};

Navbar.ToggleBtn = function NavToggle({ isOpen, togglefn }) {
  const isInitial = useRef(true);

  useEffect(() => {
    isInitial.current = false;
  }, []);

  return (
    <Button onClick={togglefn} data-testid="toggle-btn">
      <Icon current={!isOpen} isInitial={isInitial.current}>
        <FaBars />
      </Icon>
      <Icon current={isOpen} isInitial={isInitial.current}>
        <FaTimes />
      </Icon>
    </Button>
  );
};

Navbar.Links = function NavBarLinks({ linksData, showLinks, ...restProps }) {
  const linksContainerRef = useRef();
  const linksListRef = useRef();

  useEffect(() => {
    const linksHeight = linksListRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0";
    }
  }, [showLinks]);

  return (
    <LinksContainer ref={linksContainerRef}>
      <LinksList ref={linksListRef}>
        {linksData.map((link) => {
          const { id, url, text, highlight } = link;
          return (
            <li key={id}>
              <NavBarLink to={url} $highlight={highlight}>
                {text}
              </NavBarLink>
            </li>
          );
        })}
      </LinksList>
    </LinksContainer>
  );
};
