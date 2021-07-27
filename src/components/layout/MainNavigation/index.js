import React, { useState, useRef, useEffect } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
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
  NavLink,
} from "./styles/Navigation";

export default function Navigation({ children, ...restProps }) {
  return (
    <Nav data-testid="navigation" {...restProps}>
      {children}
    </Nav>
  );
}

Nav.Header = function Header({ children, ...restProps }) {
  return <NavHeader {...restProps}>{children}</NavHeader>;
};

Nav.Logo = function NavLogo({ to, ...restProps }) {
  return (
    <ReactRouterLink to={to}>
      <Logo src={mainLogo} {...restProps} />
    </ReactRouterLink>
  );
};

Nav.ToggleBtn = function NavToggle({ isOpen, togglefn }) {
  const isInitial = useRef(true);

  useEffect(() => {
    isInitial.current = false;
  }, []);

  return (
    <Button onClick={togglefn}>
      <Icon current={!isOpen} isInitial={isInitial.current}>
        <FaBars />
      </Icon>
      <Icon current={isOpen} isInitial={isInitial.current}>
        <FaTimes />
      </Icon>
    </Button>
  );
};

Nav.Links = function NavLinks({ linksData, showLinks, ...restProps }) {
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
            <li>
              <NavLink key={id} to={url} border={highlight}>
                {text}
              </NavLink>
            </li>
          );
        })}
      </LinksList>
    </LinksContainer>
  );
};

// const MainNavigation = () => {
//   const [showLinks, setShowLinks] = useState(false);
//   const linksContainerRef = useRef();
//   const linksListRef = useRef();
//   const toggleLinks = () => {
//     setShowLinks(!showLinks);
//   };

//   useEffect(() => {
//     const linksHeight = linksListRef.current.getBoundingClientRect().height;
//     if (showLinks) {
//       linksContainerRef.current.style.height = `${linksHeight}px`;
//     } else {
//       linksContainerRef.current.style.height = "0";
//     }
//   }, [showLinks]);

//   return (
//     <Nav data-testid="navigation">
//       <NavHeader>
//         <Logo src={mainLogo} />
//         <ToggleBtn
//           toggle={toggleLinks}
//           isOpen={showLinks}
//           data-testid="toggle-btn"
//         />
//       </NavHeader>
//       <LinksContainer ref={linksContainerRef}>
//         <LinksList ref={linksListRef}>
//           {links.map((link) => {
//             const { id, url, text, highlight } = link;
//             return (
//               <li>
//                 <NavLink key={id} to={url} border={highlight}>
//                   {text}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </LinksList>
//       </LinksContainer>
//     </Nav>
//   );
// };
