import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, signIn } from "./navData";

import classes from "./MainNavigation.module.css";
import mainLogo from "../../logo.png";

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
    <nav className={classes.nav} data-testid="navigation">
      <div className={classes.nav_center}>
        <div className={classes.nav_header}>
          <img
            src={mainLogo}
            alt="moviechooser logo"
            className={classes.logo}
          />
          <button
            className={classes.nav_toggle}
            data-testid="toggle-btn"
            onClick={toggleLinks}
          >
            <FaBars />
          </button>
        </div>

        <div className={classes.links_container} ref={linksContainerRef}>
          <ul>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
          <ul className={classes.sign_in}>
            {signIn.map((signIn) => {
              const { id, url, text } = signIn;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
