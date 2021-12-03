import React, { useRef, useEffect } from "react";
import { NavLink as ReactRouterLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import useWindowSize from "../../hooks/use-window-size";

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
  const { width } = useWindowSize();
  if (width > 799) {
    showLinks = true;
  }

  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 1, delay: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 1, delay: 0.5 },
    },
  };

  const linksContainerVariants = {
    hidden: {
      opacity: 0,
      x: "50vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: 0.1 },
    },
    exit: {
      opacity: 0,
      x: "100vw",
      transition: { duration: 0.3, delay: 0 },
    },
  };

  return (
    <AnimatePresence>
      {showLinks && (
        <>
          <NavLinkBackdrop
            onClick={closefn}
            className={!showLinks && "remove"}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          ></NavLinkBackdrop>
          <LinksContainer
            variants={linksContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            {...restProps}
          >
            <LinksList>{children}</LinksList>
          </LinksContainer>
        </>
      )}
    </AnimatePresence>
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
