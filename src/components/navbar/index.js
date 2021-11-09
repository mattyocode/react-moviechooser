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
  NavBarActionBtn,
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
  const goToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <ReactRouterLink to={to} onClick={goToTop}>
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
  showLinks,
  closefn,
  children,
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
      <LinksContainer ref={linksContainerRef} {...restProps}>
        <LinksList ref={linksListRef}>{children}</LinksList>
      </LinksContainer>
    </>
  );
};

Navbar.NavbarLink = function NavbarLink({
  url,
  text,
  activeClass,
  highlight,
  addClass,
  children,
  ...restProps
}) {
  return (
    <NavBarLink
      to={url}
      activeClassName={activeClass}
      $highlight={highlight}
      className={addClass}
      {...restProps}
    >
      {text}
    </NavBarLink>
  );
};

Navbar.NavbarBtn = function NavbarBtn({
  actionFn,
  activeClass,
  highlight,
  addClass,
  children,
  ...restProps
}) {
  return (
    <NavBarActionBtn
      onClick={actionFn}
      activeClassName={activeClass}
      $highlight={highlight}
      className={addClass}
    >
      {children}
    </NavBarActionBtn>
  );
};
