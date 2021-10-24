import React, { useRef, useEffect } from "react";
import { NavLink as ReactRouterLink } from "react-router-dom";
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
  NavBarHashLink,
  NavLinkBackdrop,
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

Navbar.Links = function NavBarLinks({
  linksData,
  showLinks,
  togglefn,
  closefn,
  ...restProps
}) {
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
    <>
      <NavLinkBackdrop
        onClick={closefn}
        className={!showLinks && "remove"}
      ></NavLinkBackdrop>
      <LinksContainer ref={linksContainerRef}>
        <LinksList ref={linksListRef}>
          {linksData.map((link) => {
            const { id, url, text, highlight, isHash } = link;
            const hashLink = isHash;
            console.log("HASH", hashLink);
            return (
              <li key={id} onClick={togglefn}>
                {!hashLink ? (
                  <NavBarLink
                    to={url}
                    activeClassName="active"
                    $highlight={highlight}
                  >
                    {text}
                  </NavBarLink>
                ) : (
                  <NavBarHashLink
                    to={url}
                    $highlight={highlight}
                    spy={true}
                    smooth={true}
                  >
                    {text}
                  </NavBarHashLink>
                )}
              </li>
            );
          })}
        </LinksList>
      </LinksContainer>
    </>
  );
};
